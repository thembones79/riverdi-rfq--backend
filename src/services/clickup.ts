import axios from "axios";
import { keys } from "../config/keys";
import { BadRequestError } from "../errors";

interface IcreateTask {
  pmEmail: string;
  rfqCode: string;
}

interface ITeamMember {
  id: number;
  email: string;
}

interface IClickUpUser {
  user: ITeamMember;
}

const CLICKUP_RIVERDI_SUBCATEGORY = 55059859;

export class ClickUp {
  static async findUserId(email: string) {
    try {
      const response = await axios.get(`https://api.clickup.com/api/v2/team`, {
        headers: { Authorization: keys.CLICKUP_API_SECRET },
      });

      const team = response.data.teams[0].members.map((t: IClickUpUser) => {
        return { id: t.user.id, email: t.user.email };
      });

      const teamMember = team.filter((tm: ITeamMember) =>
        tm.email.includes(email)
      )[0];

      return teamMember?.id || 0;
    } catch (e) {
      console.warn(e);
      throw new BadRequestError(e.response.data.error);
    }
  }

  static async createTask({ pmEmail, rfqCode }: IcreateTask) {
    const userId = await this.findUserId(pmEmail);

    try {
      const response = await axios.post(
        `https://app.clickup.com/v1/subcategory/${CLICKUP_RIVERDI_SUBCATEGORY}/task`,
        {
          name: rfqCode,
          assignees: [userId],
          status: "open projects",
        },
        {
          headers: { Authorization: keys.CLICKUP_APP_SECRET },
        }
      );

      return response.data.id;
    } catch (e) {
      console.warn(e);
      throw new BadRequestError(e.response.data.error);
    }
  }

  static async getTaskStatus(taskId: string) {
    try {
      const response = await axios.get(
        `https://api.clickup.com/api/v2/task/${taskId}`,
        {
          headers: { Authorization: keys.CLICKUP_API_SECRET },
        }
      );
      console.log(response.data.status.status);
      return response.data.status.status;
    } catch (e) {
      console.warn(e);
      throw new BadRequestError(e.response.data.error);
    }
  }
}
