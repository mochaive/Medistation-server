const mongoose = require('mongoose')
const Schema = mongoose.Schema

const medicineSchema = new Schema({

    id: String,
    name: String,
    shape: String,
    company: String,
    store: String,
    symptom: Array,
    takeInfo: Array,
    how: Array,
    caution: Array

})

// 만 n세 이상 - 만 n세 미만

/* JSON example
{
	"id": "8806265000685",
	"name": "판피린티정",
	"shape": "흰색의 장방형 정제",
	"company": "동아제약",
	"store": "기밀용기, 실온보관",
	"symptom": [
		{
			"name": "콧물"
		},
		{
			"name": "코막힘"
		},
		{
			"name": "재채기"
		},
		{
			"name": "인후통"
		},
		{
			"name": "기침"
		},
		{
			"name": "가래"
		},
		{
			"name": "오한"
		},
		{
			"name": "발열"
		},
		{
			"name": "관절통"
		},
		{
			"name": "두통"
		},
		{
			"name": "근육통"
		}
	],
	"takeInfo": [
		{
			"info": "충분한 물과 함께 투여하세요"
		},
		{
			"info": "졸음이 올 수 있으므로 운전, 위험한 기계조작시 주의하세요"
		},
		{
			"info": "전문가와 상의없이 다른 감기약과 병용하지 마세요"
		},
		{
			"info": "이 약의 투여기간 동안에는 가능한 금주하세요"
		},
		{
			"info": "간질환 환자나 신장질환 환자의 경우 전문가에게 미리 알리세요"
		},
		{
			"info": "감염증상을 은폐시켜 감염성 합병증 진단을 지연시킬 수 있어요"
		}
	],
	"how": [
		{
			"startAge": "15",
			"endAge": "100",
			"timeNumber": "3",
			"eatNumber": "1"
		}
	],
	"caution": [
		{
			"keyword": "음주"
		},
		{
			"keyword": "피부발진"
		},
		{
			"keyword": "과민반응"
		},
		{
			"keyword": "아세트아미노펜"
		},
		{
			"keyword": "해열진통제"
		},
		{
			"keyword": "천식"
		},
		{
			"keyword": "영아"
		},
		{
			"keyword": "MAO억제제"
		},
		{
			"keyword": "유전적인문제"
		},
		{
			"keyword": "진해거담제"
		},
		{
			"keyword": "다른감기약"
		},
		{
			"keyword": "진정제"
		},
		{
			"keyword": "항히스타민제"
		},
		{
			"keyword": "내복약"
		},
		{
			"keyword": "경구제"
		},
		{
			"keyword": "멀미약"
		},
		{
			"keyword": "알레르기용약"
		}
	]
}
*/

module.exports = mongoose.model('medicine', medicineSchema)