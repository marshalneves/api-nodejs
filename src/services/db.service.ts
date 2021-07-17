import { query } from "express";
import sqlite3 from "sqlite3";

// Serviço DB
const DATABASE_FILE = process.env.DATABASE_FILE;

if (!DATABASE_FILE) throw new Error("DATABASE_FILE not exists");

export const openConnection = () => {
  let db = new sqlite3.Database(DATABASE_FILE);
  return db;
};

export const dbQueryFirst = async (query: string, params?: any[]) => {
  const retorno = await dbQuery(query, params);
  return retorno[0];
};

export const dbQuery = (query: string, params?: any[]) => {
  let db = openConnection();

  return new Promise<any[]>((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  }).finally(() => {
    db.close();
  });
};

export type query = {
  sql: string;
  params: any[];
};

export const dbQueryBatch = async (querys: query[]) => {
  const promises: Promise<any[]>[] = [];

  let db = openConnection();
  db.exec("BEGIN TRANSACTION;");

  const result = db.run(querys[0].sql, querys[0].params, (err: any, rows: any) => {
    if (err) {
        return false;
    } else {
        return true;
    }
  });
  
  console.log(result);

//   db.run(querys[0].sql, querys[0].params, (err: any, rows: any) => {
//     if (err) {
//       db.exec("ROLLBACK");
//       db.close();
//       console.log(err);
//     } else {
//       db.run(querys[1].sql, querys[1].params, (err: any, rows: any) => {
//         if (err) {
//           db.exec("ROLLBACK");
//           db.close();
//           console.log(err);
//         } else {
//           db.exec("COMMIT");
//           db.close();
//         }
//       });
//     }
//   });

  // querys.forEach((query) => {
  //     let sql = query.sql;
  //     console.log(sql)
  //     let params = query.params;
  //     let promise = new Promise<any[]>((resolve, reject) => {
  //         db.run(sql, params, (err: Error, rows: any) => {
  //             if(err) {
  //                 reject(err);
  //             }
  //             else
  //                 resolve(rows);
  //         });
  //     });
  //     promises.push(promise);
  // })

  // db.exec('BEGIN IMMEDIATE TRANSACTION;');
  // console.log('BEGIN TRANSACTION;')

  // Promise.all(promises).then((values) => {

  // }).catch(err => {
  //     db.exec('ROLLBACK;');

  // }).finally(() => {
  //     db.exec('ROLLBACK;');
  //     console.log('CLOSE')
  //     db.close();
  // })
};
