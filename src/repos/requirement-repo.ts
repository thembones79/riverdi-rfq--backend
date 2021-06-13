import { BadRequestError } from "../errors";
import { pool } from "../pool";

class RequirementRepo {
  static async findByRfqId(rfq_id: string) {
    try {
      const result = await pool.query(
        `
      SELECT
      id,
      rfq_id,
      c_nc_cwr,
      requirement,
      note,
      to_char(requirements.updated_at, 'YYYY-MM-DD HH24:MI:SS') as updated
      FROM requirements
      WHERE rfq_id = $1
      ORDER BY updated ASC;
      `,
        [rfq_id]
      );
      return result?.rows;
    } catch (error) {
      throw new BadRequestError(error.message);
    }
  }

  static async findById(id: string) {
    try {
      const result = await pool.query(
        `
        SELECT
        id,
        rfq_id,
        c_nc_cwr,
        requirement,
        note,
        to_char(requirements.updated_at, 'YYYY-MM-DD HH24:MI:SS') as updated
        FROM requirements WHERE id = $1;`,
        [id]
      );
      return result?.rows[0];
    } catch (error) {
      throw new BadRequestError(error.message);
    }
  }

  static async insert({
    rfq_id,
    c_nc_cwr,
    requirement,
    note,
  }: {
    rfq_id: string;
    c_nc_cwr: string;
    requirement: string;
    note: string;
  }) {
    try {
      const result = await pool.query(
        `INSERT INTO requirements (rfq_id, c_nc_cwr, requirement, note) VALUES ($1, $2, $3, $4) RETURNING id, rfq_id;`,
        [rfq_id, c_nc_cwr, requirement, note]
      );
      return result?.rows[0];
    } catch (error) {
      throw new BadRequestError(error.message);
    }
  }

  static async updateData({
    id,
    rfq_id,
    c_nc_cwr,
    requirement,
    note,
  }: {
    id: string;
    rfq_id: string;
    c_nc_cwr: string;
    requirement: string;
    note: string;
  }) {
    try {
      const result = await pool.query(
        `UPDATE requirements SET rfq_id = $2, c_nc_cwr = $3, requirement = $4, note = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING id, rfq_code;`,
        [id, rfq_id, c_nc_cwr, requirement, note]
      );
      return result?.rows[0];
    } catch (error) {
      throw new BadRequestError(error.message);
    }
  }

  static async delete(id: string) {
    try {
      const result = await pool.query(
        `DELETE FROM requirements WHERE id = $1 RETURNING id;`,
        [id]
      );
      return result?.rows[0];
    } catch (error) {
      throw new BadRequestError(error.message);
    }
  }

  static async count() {
    try {
      const result = await pool.query(`SELECT COUNT(*) FROM requirements;`);
      return parseInt(result?.rows[0].count);
    } catch (error) {
      throw new BadRequestError(error.message);
    }
  }
}

export { RequirementRepo };