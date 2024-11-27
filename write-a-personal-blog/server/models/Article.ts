import { ObjectId } from "mongodb";

export interface Article {
    _id?: ObjectId;      // 由于 MongoDB 默认的 ObjectId 类型，通常会将它转换为字符串
    title: string;
    content: string;
    categories: string[];
    created_at: Date;
    updated_at: Date;
}
  