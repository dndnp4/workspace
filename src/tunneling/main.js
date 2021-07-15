/**
 * AWS bastion server 를 이용하여 private network 에 접속할 때 이용함.
 * 아래 코드는 bastion 에서 private 영역의 mysql server 로 tunneling 한 후
 * bastion local 에서 mysql server로 접속을 시도하는 상황
 */

const fs = require('fs');
const mysql = require('mysql');
const path = require('path');
const tunnel = require('tunnel-ssh');

const key = fs.readFileSync(path.join(__dirname, './key.ppk'));

const tunnelConfig = {
    username : 'name',
    host : 'host',
    port : 22,
    privateKey : key,
    dstHost : '터널뚫을곳 호스트',
    dstPort : 3306, //뚫을곳 포트
    localPort : 3308    // 뚫을곳과 연결할 로컬 포트
}
const mysqlConfig = {
    host : '127.0.0.1',
    user : 'root',
    password : 'root',
    port : 3308,
    database : 'db',
    connectionLimit : 100,
    multipleStatements :true,
    waitForConnections : true,
    dateStrings : 'date'
}

const pool = mysql.createPool(mysqlConfig);

function getConnection(){
    return new Promise(function(resolve, reject){
        try {
            pool.getConnection(function(err, conn){
                if(err) throw e;
                return resolve({
                    query : function(sql, params){
                        return new Promise(function(mResolve, mReject){
                            conn.query(sql, params, function(error, rows){
                                if(error) return mReject(error);
                                return mResolve(rows);
                            });
                        });
                    },
                    beginTransaction : function(){
                        return new Promise(function(mResolve, mReject){
                            conn.beginTransaction(function(error){
                                if(error) return mReject(error);
                                return mResolve();
                            })
                        });
                    },
                    rollback : function(){
                        return new Promise(function(mResolve, mReject){
                            conn.rollback(function(error){
                                if(error) return mReject(error);
                                return mResolve();
                            })
                        });
                    },
                    commit : function(){
                        return new Promise(function(mResolve, mReject){
                            conn.commit(function(error){
                                if(error) return mReject(error);
                                return mResolve();
                            })
                        });
                    },
                    release : function(){
                        conn.release();
                    }
                });
            });
        }catch(e) {
            return reject(e);
        }
    });
}

tunnel(tunnelConfig, async function(error, server){
    const conn1 = await getConnection();
    const data1 = await conn1.query(`select * from user limit 1;`);
    conn1.release();
    //TODO ............
});
