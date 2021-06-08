import { BadRequestError } from "../errors";
import { pool } from "../pool";

class RfqRepo {
  static async find() {
    try {
      const result = await pool.query(`
      SELECT
      rfq_code,
      eau,
      customers.name AS customer,
      distributors.name AS distributor,
      pm.shortname AS pm,
      kam.shortname AS kam,
      to_char(rfqs.updated_at, 'YYYY-MM-DD HH24:MI:SS') as updated
      FROM rfqs
      JOIN customers ON customers.id = rfqs.customer_id
      JOIN distributors ON distributors.id = rfqs.distributor_id
      JOIN users AS pm ON pm.id = rfqs.pm_id
      JOIN users AS kam ON kam.id = rfqs.kam_id
      ORDER BY updated DESC;
      `);
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
  }: {
    id: string;
    username: string;
    email: string;
  }) {
    try {
      const result = await pool.query(
        `UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING id, username, email;`,
        [username, email, id]
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
        `UPDATE users SET password = $1 WHERE id = $2 RETURNING id, username, email;`,
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

  static async count() {
    try {
      const result = await pool.query(`SELECT COUNT(*) FROM users;`);
      return parseInt(result?.rows[0].count);
    } catch (error) {
      throw new BadRequestError(error.message);
    }
  }
}

export { RfqRepo };
