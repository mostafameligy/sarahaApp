import { userModel } from "./model/user.model.js";

export const findOne = async ({ model, filter, select, options }) => {
  if(select){
    return await model.findOne(filter).select(select);
  }
  return await model.findOne(filter);
};

export const findAll = async ({ model, filter, select, options }) => {
  
  return await model.find(filter);
};


export const insertOne =async ({ model, data, select, options }) => {
    return await model.insertOne(data)
};

export const findById = async ({model , id})=>{
  return await model.findById(id)
} 

export const deleteById = async ({model , id})=>{
  return await model.findByIdAndDelete(id)
}

export const updateById = async ({model , id , data})=>{
  return await model.findByIdAndUpdate(id , data , {returnDocument: "after"})
}
