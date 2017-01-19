var array = ['a', 'b', 'c'];
var array2 = ['c', 'd', 'e'];
var difference = array.filter(function(item, index, array) {
	// console.log(item);
	// console.log(this);
	return this.indexOf(item) >= 0;
}, array2)
// console.log(difference)

var string = 'abbc12nands;alkdvam;akdavldajdgls';
var mike= 'cdc123f;ewrpqoi5-495f;alkjfdqoieqoirueqqj;erqiqoprui';
// let
var foo

var letters = string.replace(/\s+/g, '').split('').sort()

					.map(function(letter) {
						return letter.toLowerCase().match(/\S/g);
					})
					.reduce(function(last, now) {
						return last.concat(now)
					},[])
					.reduce(function(last, now) {
						var index = last[0].indexOf(now);
						if(index === -1) {
							last[0].push(now);
							last[1].push(1)
						} else {
							last[1][index] += 1;
						}
						return last
					}, [[], []])
					.reduce(function(last, now, index, context) {
						var zip = [];
						last.forEach(function(word, i) {
							zip.push([word, context[1][i]])
						});
						return zip;
					})

var letters2  = mike.replace(/\s+/g, '').split('').sort()

					.map(function(letter) {
						return letter.toLowerCase().match(/\S/g);
					})
					.reduce(function(last, now) {
						return last.concat(now)
					},[])
					.reduce(function(last, now) {
						var index = last[0].indexOf(now);
						if(index === -1) {
							last[0].push(now);
							last[1].push(1)
						} else {
							last[1][index] += 1;
						}
						return last
					}, [[], []])
					.reduce(function(last, now, index, context) {
						var zip = [];
						last.forEach(function(word, i) {
							zip.push([word, context[1][i]])
						});
						return zip;
					})

// console.log('letters: ', letters)
// console.log('letters2: ', letters2)



var test = letters.filter(function(item, index, arr) {
				 foo = this.map(function(i){
					return i[0]
				})
				
				 return foo.indexOf(item[0]) >= 0;
			}, letters2)

 // console.log('test: ',test) 

var test2 = letters2.filter(function(item, index, arr) {
				 bar = this.map(function(i){
					return i[0]
				})
				
				 return bar.indexOf(item[0]) >= 0;
			}, letters)

 // console.log('test2: ',test2) 


var diff = test.map(function(item, index, array){
				var reformatted = {};
				// console.log('item',item[1])
				// console.log('this',this[1])
				reformatted[item[0]] = (item[1] - this[index][1])
				return reformatted;

				
}, test2)


console.log(diff)








