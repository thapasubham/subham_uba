import { Mentor } from "../../../entity/user.js";
import { login } from "../../../types/login.types.js";
import { MentorDb } from "../database/mentor.db.js";

/**
 * Class to perfrom CRUD operation
 * @example
 * const mentorService = new mentorService();
 */
export class MentorService {
  /**
   *
   * Creates new mentor
   * @param {mentor} [Mentor] - Pass the mentor object you want to create
   *
   * @returns {mentor} - Newly created mentor.
   *
   * @example
   * const mentor= {id: 4, firstname: "John", lastname :"Pork"}
   * const result = mentorService.Creatementor(mentor);
   *
   */
  async CreateMentor(mentor: Mentor): Promise<Mentor> {
    mentor.id = Date.now();
    const createdmentor: Mentor = await MentorDb.CreateMentor(mentor);

    return createdmentor;
  }

  /**
   *
   * Delete mentor with id
   * @param {number} [id] - Pass the mentor object you want to create
   *
   * @returns {number} - Status if deleted or not.
   *
   *
   * @example
   * const result = mentorService.Creatementor(4);
   * //This returns 1 if the mentor is deleted and 0 if failed to deleted.
   *
   */
  async DeleteMentor(id: number): Promise<number> {
    const del = await MentorDb.DeleteMentor(id);

    return del;
  }

  /**
   * Returns a list of mentors or a single mentor if an ID is provided.
   *
   * @param {number} [limit] - Total number of mentors to retrieve.
   * @param {number} [offset] - Number of mentors to skip from the start.
   * @param {number} [id] - The ID of the mentor to return.
   * @returns {mentor[]} - The requested mentors. Always returns array.
   *
   * @example
   * //Get mentor by Id
   * const mentor = await mentorService.Readmentors(0,0,id);
   * //remember the mentor is still array
   *
   * //Get mentors with pagination
   * const mentors = await mentorService.Readmentors(limit, offset);
   */

  async ReadMentors(
    limit?: number,
    offset?: number,
    id?: number
  ): Promise<Mentor[] | Mentor> {
    if (typeof id === "number") {
      const mentor = await MentorDb.ReadMentor(id);
      return mentor;
    }

    if ((limit as number) >= 0 && (offset as number) >= 0) {
      const mentors: Mentor[] = await MentorDb.ReadMentors(
        limit as number,
        offset as number
      );

      return mentors;
    } else {
      return [];
    }
  }

  async Update(mentor: Mentor): Promise<number> {
    const result = await MentorDb.UpdateMentor(mentor);

    return result;
  }

  async Login(user: login): Promise<any> {
    const result = await MentorDb.Login(user);
    return result;
  }
}
