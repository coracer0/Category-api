import pool from "../database/database";
class CategoryDAO {
  public async lista() {
    const result = await pool.then(async (connection) => {
      return await connection.query(
        "Select c.cveCategoria, c.nombre, c.descripcion, c.tipo, concat(u.nombre,' ',u.apellidos)persona " +
          "from categoria c INNER JOIN usuario u on c.cveRegistro = u.cveUsuario order by c.cveCategoria desc"
      );
    });
    return result;
  }

  public async insert(category: any) {
    const result = await pool.then(async (connection) => {
      return await connection.query("INSERT INTO categoria SET ?", category);
    });
    return result;
  }

  public async verifyCategory(category: string) {
    const result = await pool.then(async (connection) => {
      return await connection.query(
        "SELECT * FROM categoria where nombre = ?",
        category
      );
    });
    return result;
  }
}
export const dao = new CategoryDAO();
