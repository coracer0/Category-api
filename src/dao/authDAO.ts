import pool from "../database/database";
class AuthDAO {
  public async getUser(username: String) {
    const result = await pool.then(async (connection) => {
      return await connection.query("select u.cveUsuario, u.username, u.password from usuario u WHERE username = ?", [
        username,
      ]);
    });
    return result;
  }

  public async getUserById(cveUsuario: number) {
    const result = await pool.then(async (connection) => {
      return await connection.query("SELECT * FROM usuario WHERE cveUsuario = ?", [
        cveUsuario,
      ]);
    });
    return result;
  }
}
export const dao = new AuthDAO();
