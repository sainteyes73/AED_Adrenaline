// Example model
/*

var locationSchema = new Schema({
  title: String,
  address: String,
  coords: { // GeoJSON(좌표로 도형을 포맷팅하는 오픈 소스 규격) 형식을 사용하는 지형 공간 검색용 필드 MongoDB에서 지원
    type: [Number],
    index: '2dsphere'
  },
  createAt: {
    type: Date,
    default: Date.now()
  }
});

mongoose.model('location', locationSchema);
*/
