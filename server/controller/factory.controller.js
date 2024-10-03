const { validationResult } = require("express-validator");
const httpStatusText = require("../utils/httpStatusText");
const ApiFeatures = require("../utils/apiFeatures");

const createOne = async (Model, req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: httpStatusText.ERROR,
      message: "validation Failed",
      errors: errors.array(),
    });
  }
  const {
    title,
    description,
    price,
    chapter,
    imageCover,
    attachment,
    video,
    category,
    access,
  } = req.body;
  console.log("req.files =>>> ", req.file);
  const oldOne = await Model.findOne({ title: title });
  if (oldOne) {
    return res
      .status(400)
      .json({ message: "Document with this title already exists" });
  }

  const courseId = req.params.courseId;

  const newOne = new Model({
    title,
    description,
    price,
    chapter,
    category,
    video: req.file ? req.file.filename : undefined,
    course: courseId,
    access,
    imageCover:
      req.files && req.files.imageCover
        ? req.files.imageCover[0].filename
        : undefined,
    attachment:
      req.files && req.files.attachment
        ? req.files.attachment[0].filename
        : undefined,
  });
  await newOne.save();

  return res
    .status(200)
    .json({ status: httpStatusText.SUCCESS, data: { newOne } });
};

const getAll = async (Model, req, res) => {
  let filter = {};
  if (req.filterObj) {
    filter = req.filterObj;
  }
  const countDocuments = await Model.countDocuments();
  const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
    .paginate(countDocuments)
    .filter()
    .sort()
    .search()
    .limitFields();

  const { mongooseQuery, paginationResults } = apiFeatures;
  const documents = await mongooseQuery;

  res.json({
    status: httpStatusText.success,
    data: {
      results: documents.length,
      pagination: paginationResults,
      data: documents,
    },
  });
};

// const getOne = async (Model, populateOptions, req, res) => {
//   const id = req.params.id;
//   let query = await Model.findById(id);

//   if (populateOptions) {
//     query = await query.populate(populateOptions);
//   }
//   const document = await query;
//   if (!document) {
//     res.status(404).json({ message: "Document not found" });
//     return;
//   }
//   res.json({ status: httpStatusText.SUCCESS, data: { document } });
// };

const getOne = async (Model, populateOptions, req, res) => {
  const id = req.params.id;
  let query = await Model.findById(id);

  if (!query) {
    res.status(404).json({ message: "Document not found" });
    return;
  }

  if (populateOptions) {
    query = await query.populate(populateOptions);
  }

  const document = await query;
  if (!document) {
    res.status(404).json({ message: "Document not found" });
    return;
  }

  res.json({ status: httpStatusText.SUCCESS, data: { document } });
};

const updateOne = async (Model, req, res) => {
  const id = req.params.id;

  try {
    const document = await Model.findById(id);
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    const updateData = { ...req.body };

    // Check if there are files uploaded
    if (req.files && req.files.imageCover) {
      updateData.imageCover = req.files.imageCover[0].filename;
    }
    if (req.files && req.files.attachment) {
      updateData.attachment = req.files.attachment[0].filename;
    }
    if (req.file) {
      updateData.video = req.file.filename;
    }

    const result = await Model.updateOne({ _id: id }, { $set: updateData });
    console.log("req.files >> ", req.files);
    console.log(req.body);

    if (result.nModified === 0) {
      return res.status(404).json({ message: "No documents updated" });
    }

    const updatedDocument = await Model.findById(id); // Retrieve the updated document
    return res.status(200).json({
      status: "success",
      data: { updatedOne: updatedDocument },
    });
  } catch (err) {
    return res.status(400).json({
      message: "Failed to update document",
      error: err.message,
    });
  }
};

const deleteOne = async (Model, req, res) => {
  const id = req.params.id;
  const document = await Model.findById(id);

  if (document) {
    try {
      let deletedOne;
      deletedOne = await Model.deleteOne({ _id: id });
      const documents = await Model.find();
      res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: { documents },
      });
    } catch (err) {
      res.status(401).json({ message: "Error deleting document" });
    }
  } else {
    res.status(404).json({ message: "product not found" });
    return;
  }
};

module.exports = {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
};
