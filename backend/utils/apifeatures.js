const { default: mongoose } = require("mongoose");

class ApiFeatures {
  constructor(query, req) {
    (this.query = query),
      (this.queryStr = { ...req.query }),
      (this.param = { ...req.params });
  }
  search() {
    const keyword = this.queryStr.keyword
      ? {
          NAME: {
            $regex: this.queryStr.keyword, //creating regex expression
            $options: "i", //case insensitive
          },
        }
      : {};

    const id = this.queryStr.id
      ? typeof this.queryStr.id == typeof ""
        ? {
            _id: new mongoose.Types.ObjectId(this.queryStr.id),
          }
        : {
            _id: {
              $in: this.queryStr.id?.map((e) => new mongoose.Types.ObjectId(e)),
            },
          }
      : {};

    const roll = this.queryStr.roll
      ? {
          rollno: {
            $regex: this.queryStr.roll,
            $options: "i",
          },
        }
      : {};
    const classsearch = this.queryStr.CLASS
      ? {
          CLASS: {
            $regex: this.queryStr.CLASS,
            $options: "i",
          },
        }
      : {};

    if (this.queryStr.DEPARTMENT != undefined) {
      this.query = this.query.find(this.queryStr.DEPARTMENT);
    }
    this.query = this.query.find(id);
    this.query = this.query.find(classsearch);
    this.query = this.query.find(roll);
    this.query = this.query.find(keyword);
    return this;
  }
  filter() {
    const queryCopy = { ...this.queryStr };
    const removeFields = ["keyword", "roll", "CLASS", "id"];
    removeFields.forEach((e) => {
      delete queryCopy[e];
    });
    this.queryStr.ids != undefined
      ? (this.query = this.query.find({
          _id: {
            $in:
              typeof this.queryStr.ids == typeof ""
                ? [this.queryStr.ids]
                : this.queryStr.ids,
          },
        }))
      : "";
    this.queryStr.T_Id != undefined 
      ? (this.query = this.query.find({
          TEACHERS: { $in: [this.queryStr.T_Id] },
        }))
      : (this.query = this.query.find(queryCopy));

    // console.log(JSON.stringify(this.query));
    return this;
  }

  criteria(id) {
    const criteria = this.param.id;
    const department = this.param.dept;
    delete this.param.dept;
    delete this.param.id;
    let matchkey = [];
    if (department != undefined && id == undefined) {
      this.queryStr.Class == undefined &&
        matchkey.push({ Class: { $regex: department } });
    } else {
      matchkey.push({
        T_Id: {
          $in:
            typeof id == typeof "" || id?.length == undefined
              ? [new mongoose.Types.ObjectId(id)]
              : id.map((e) => new mongoose.Types.ObjectId(e)),
        },
      });
    }
    Object.entries(this.queryStr).forEach((e) => {
      matchkey.push({
        [e[0]]: {
          $in: typeof e[1] == typeof "" ? [e[1]] : e[1],
        },
      });
    });
    // console.log(matchkey[0].T_Id);
    if (criteria != ":" && criteria != undefined) {
      // console.log("here");
      this.query = this.query.aggregate([
        { $match: { $and: matchkey } },
        {
          $group: {
            _id: `$${criteria}`,
            q0: { $sum: "$q0" },
            q1: { $sum: "$q1" },
            q2: { $sum: "$q2" },
            q3: { $sum: "$q3" },
            q4: { $sum: "$q4" },
            q5: { $sum: "$q5" },
            q6: { $sum: "$q6" },
            q7: { $sum: "$q7" },
            count: { $sum: "$count" },
            Avg: {
              $avg: {
                $add: ["$q0", "$q1", "$q2", "$q3", "$q4", "$q5", "$q6", "$q7"],
              },
            },
          },
        },

        {
          $sort: { Avg: -1 },
        },
      ]);
    } else {
      // if (id == undefined) {
      //   console.log(matchkey);
      // }
      // console.log(matchkey[0]);
      this.query = this.query.aggregate([
        { $match: { $and: matchkey } },
        {
          $group: {
            _id: "$T_Id",
            q0: { $sum: "$q0" },
            q1: { $sum: "$q1" },
            q2: { $sum: "$q2" },
            q3: { $sum: "$q3" },
            q4: { $sum: "$q4" },
            q5: { $sum: "$q5" },
            q6: { $sum: "$q6" },
            q7: { $sum: "$q7" },
            count: { $sum: "$count" },
            Avg: {
              $avg: {
                $add: ["$q0", "$q1", "$q2", "$q3", "$q4", "$q5", "$q6", "$q7"],
              },
            },
          },
        },
        {
          $sort: { Avg: -1 },
        },
      ]);
    }

    return this;
  }
}

module.exports = ApiFeatures;
