import pool from "../database/database";

class UserDAO {
  public async lista() {
    const result = await pool.then(async (connection) => {
      return await connection.query(
        "SELECT cveUsuario,username FROM usuario"
      );
    });

    return result;
  }

  public async verifyUser(username: string) {
    const result = await pool.then(async (connection) => {
      return await connection.query(
        "SELECT cveUsuario FROM usuario WHERE username = ?",
        [username]
      );
    });
    return result;
  }
  
  public async insert(username: any) {
    const result = await pool.then(async (connection) => {
      return await connection.query("INSERT INTO usuario set ?", [username]);
    });
    return result;
  }
}
export const dao = new UserDAO();
