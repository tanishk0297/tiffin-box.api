module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        
        Name: String,
        Email:String,
        Number: Number,
        Subject: String,
        Message: String,
        
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const contact = mongoose.model("contact", schema);
    return contact;
  };
  