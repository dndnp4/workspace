/**
 * mysql를 동기식으로 처리하기 위해 mysql2(https://github.com/sidorares/node-mysql2)를 기존에 사용해옴. 자체적으로 promise 구현됨.
 * 이후 mysql2 개발진이 mysqljs(https://github.com/mysqljs/mysql)팀과 합쳐지고 더 이상 진행이 안될 것이라 하여 mysqljs 를 사용함
 *
 * mysqljs 는 promise 관련 부분이 없다. 그래서 쓸거만 직접 만들겠음.
 * 기본적으로 쿼리날리는거랑, 트랙잭션에 필요한 것들만 구현.
 */

const mysql = require('mysql');
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

(async function(){
    const conn = await getConnection();
    const rows = await conn.query('select 1;');
    console.log(rows);
})();
