import { BadRequestError } from "../errors";
import { pool } from "../pool";

class UserRepo {
  static async find() {
    try {
      const result = await pool.query(
        `
        SELECT id, username, username AS name, email, shortname, role_id
        FROM users
        WHERE role_id <> 1
        ORDER BY username;
        `
      );
      return result?.rows;
    } catch (error) {
      throw new BadRequestError(error.message);
    }
  }

  static async findById(id: string) {
    try {
      const result = await pool.query(
        `SELECT id, username, email, shortname FROM users WHERE id = $1;`,
        [id]
      );
      return result?.rows[0];
    } catch (error) {
      throw new BadRequestError(error.message);
    }
  }

  static async findByEmail(email: string) {
    try {
      const result = await pool.query(
        `SELECT id, username, email, password, shortname FROM users WHERE email = $1;`,
        [email]
      );
      return result?.rows[0];
    } catch (error) {
      throw new BadRequestError(error.message);
    }
  }

  static async insert({
    username,
    password,
    email,
    shortname,
    role_id,
  }: {
    username: string;
    password: string;
    email: string;
    shortname: string;
    role_id: string;
  }) {
    try {
      const result = await pool.query(
        `INSERT INTO users (username, password, email, shortname, role_id) VALUES ($1, $2, $3, $4, $5) RETURNING id, username, email, shortname;`,
        [username, password, email, shortname, role_id]
      );
      return result?.rows[0];
    } catch (error) {
      throw new BadRequestError(error.message);
    }
  }

  static async updateData({
    id,
    username,
    email,
    shortname,
    role_id,
  }: {
    id: string;
    username: string;
    email: string;
    shortname: string;
    role_id: string;
  }) {
    try {
      const result = await pool.query(
        `UPDATE users SET username = $2, email = $3, shortname = $4, role_id = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING id, username, email, shortname;`,
        [id, username, email, shortname, role_id]
      );
      return result?.rows[0];
    } catch (error) {
      throw new BadRequestError(error.message);
    }
  }

  static async updatePassword({
    id,
    password,
  }: {
    id: string;
    password: string;
  }) {
    try {
      const result = await pool.query(
        `UPDATE users SET password = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id, username, email;`,
        [password, id]
      );
      return result?.rows[0];
    } catch (error) {
      throw new BadRequestError(error.message);
    }
  }

  static async delete(id: string) {
    try {
      const result = await pool.query(
        `DELETE FROM users WHERE id = $1 RETURNING id, username, email;`,
        [id]
      );
      return result?.rows[0];
    } catch (error) {
      throw new BadRequestError(error.message);
    }
  }

  static async markDeleted(id: string) {
    try {
      const result = await pool.query(
        `UPDATE users SET deleted = TRUE WHERE id = $1 RETURNING id, username, email;`,
        [id]
      );
      return result?.rows[0];
    } catch (error) {
      throw new BadRequestError(error.message);
    }
  }

  static async count() {
    try {
      const result = await pool.query(`SELECT COUNT(*) FROM users;`);
      return parseInt(result?.rows[0].count);
    } catch (error) {
      throw new BadRequestError(error.message);
    }
  }
}

export { UserRepo };
