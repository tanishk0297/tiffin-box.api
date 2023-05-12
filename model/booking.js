module.exports = mongoose => {
    // var schema = mongoose.Schema(
    //   {
        
    //     Area:String,
    //     Duration:Number,
    //     Packages: {
    //       type: String,
    //       enum: ['Two Time Meal', 'Three Time Meal', 'Three Time Delux Meal'] 
    //     },
    //     BookedBy: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref:'user'
    //     },
        
    //   },
    //   { timestamps: true }
    // );
  
    var schema = mongoose.Schema(
      {
        Area: String,
        Duration: Number,
        Packages: {
          type: String,
          enum: ["Two Time Meal", "Three Time Meal", "Three Time Deluxe Meal"],
        },
        BookedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user'
        },
      },
      { timestamps: true }
    );
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const booking = mongoose.model("booking", schema);
    return booking;
  };
  