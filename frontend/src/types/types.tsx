import mongoose from "mongoose";

export type Teacher = {
  NAME: string;
  DEPARTMENT: string;
  QUALIFICATION: [];
  EMAIL: string;
  PASSWORD: string;
  image: {
    public_id: string;
    url: string;
  };
  Role: string;
  resetPassToken: string;
  resetPassExpire: Date;
  _id: mongoose.Schema.Types.ObjectId;
};

export type Student = {
  class: string;
  email: string;
  password: string;
  name: string;
  rollno: string;
  Role: string;
  whomVoted: mongoose.Schema.Types.ObjectId[];
  resetPassToken?: string;
  resetPassExpire?: Date;
  _id: mongoose.Schema.Types.ObjectId;
};

export type Session = {
  Name: string;
  isActive: Boolean;
  _id: mongoose.Schema.Types.ObjectId;
};

export type Questionarrie = {
  _id: String;
  q0: String;
  q1: String;
  q2: String;
  q3: String;
  q4: String;
  q5: String;
  q6: String;
  q7: String;
  __v?: String;
};

export type Vote = {
  info: {
    T_Id: mongoose.Schema.Types.ObjectId | string;
    Class: String;
    count: number;
    Session_id: String;
    Criteria: String;
    Avg: number;
  };
  voteValue: {
    q0: Number;
    q1: Number;
    q2: Number;
    q3: Number;
    q4: Number;
    q5: Number;
    q6: Number;
    q7: Number;
  };
  // _id: mongoose.Schema.Types.ObjectId;
};
export type Class = {
  _id: mongoose.Types.ObjectId;
  CLASS: string;
  DEPARTMENT: string;
  TEACHERS: [] | any[];
  count: number;
};
