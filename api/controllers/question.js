const model = require("../../model");
const { successResponse, errorResponse } = require("../utils/helpers/response");

module.exports = {
  async askQue(req, res) {
    try {
      const user = req.user;
      const { grade, category, question } = req.body;
      console.log(grade, category, question, user._id);
      const saveQuestion = await model.Question.create({
        grade,
        category,
        question,
        userId: user._id,
      });
      return successResponse(res, 2000, {
        status: true,
        message: "Successfully post Question",
        data: saveQuestion,
      });
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  },
  async getAllQue(req, res) {
    try {
      const allQue = await model.Question.find({});
      if (allQue.length > 0) {
        return successResponse(res, 200, {
          status: true,
          message: "Successfully Fectch All Question",
          data: allQue,
        });
      }
      successResponse(res, 200, "No questions available at this time");
    } catch (error) {
      return errorResponse(res, 500, err.message);
    }
  },

  async upVoteQue(req, res) {
    const { id } = req.params;
    const user = req.user;
    console.log("here");
    try {
      const question = await model.Question.findOne({
        _id: id,
        voters: { $all: [user.id] },
      });
      console.log("quest");
      if (!question) {
        const upVoteQue = await model.Question.findOneAndUpdate(
          { _id: id },
          { $push: { voters: user.id }, $inc: { vote: 1 } },
          { new: true }
        );
        return successResponse(res, 200, "Successfully up voted question");
      } else {
        return errorResponse(res, 400, "User already Upvoted");
      }
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  },

  async downVoteQue(req, res) {
    const { id } = req.params;
    const user = req.user;

    try {
      const question = await model.Question.findOne({
        _id: id,
        voters: { $all: [user.id] },
      });

      console.log(question, id, user.id);

      if (question) {
        return errorResponse(res, 400, "You have already downvoted");
      }
      if (!question) {
        const downVoteQue = await model.Question.findOneAndUpdate(
          { _id: id },
          { $push: { voters: user.id }, $inc: { vote: -1 } },
          { new: true }
        );
        return successResponse(res, 200, "Successfully");
      } else {
        return errorResponse(res, 400, "You have already downvoted");
      }
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  },

  async answerQuestions(req, res) {
    const { id } = req.params;
    const user = req.user;
    const { answer } = req.body;
    try {
      const answeredQuestion = await model.Question.findOneAndUpdate(
        { _id: id },
        {
          $push: { answers: [{ answer: answer, userId: user._id }] },
        },
        { new: true }
      );
      return successResponse(
        res,
        200,
        "Successfully answered question",
        answeredQuestion
      );
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  },

  async UpVoteAnswer(req, res) {
    const { id } = req.params;
    const user = req.user;
    try {
      const answer = await model.Question.findOne({
        "answers._id": id,
        "answers.voters": { $all: [user.id] },
      });
      console.log(answer);
      if (!answer) {
        const upVoteAns = await model.Question.findOneAndUpdate(
          { "answers._id": id },
          {
            $push: { "answers.voters": user.id },
            $inc: { "answers.vote": 1 },
          },
          { new: true }
        );
        return successResponse(res, 200, "Successfully upvoted answer", answer);
      } else {
        return errorResponse(res, 400, "You can only up Vote once");
      }
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  },
};
