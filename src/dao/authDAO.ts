import pool from "../database/database";
class AuthDAO {
  public async getUser(usuario: String) {
    
    const result = await pool.then(async (connection) => {
      return await connection.query("select u.idUsuario, u.usuario, u.password, u.idRol, r.descripcion as rol from usuario u INNER JOIN rol r on u.idRol = r.idRol WHERE usuario = ?", [
        usuario,
      ]);
    });
    return result;
  }
  public async getUserById(idUsuario: number) {
    const result = await pool.then(async (connection) => {
      return await connection.query("SELECT * FROM usuario WHERE idUsuario = ?", [
        idUsuario,
      ]);
    });
    return result;
  }
}
export const dao = new AuthDAO();
