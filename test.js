const expect = require ("chai").expect
const dcf = require ("./index.js")

describe ( "proper object type getting passed", () => {
	it ( "throws an exception when the a non-array elements are passed", () => {
		expect ( dcf.bind ( {} ) ).to.throw ()
		expect ( dcf.bind ( 1 ) ).to.throw ()
		expect ( dcf.bind ( 1.0 ) ).to.throw ()
		expect ( dcf.bind ( null ) ).to.throw ()
		expect ( dcf.bind ( false ) ).to.throw ()
		expect ( dcf.bind ( new Date () ) ).to.throw ()
	})
	it ( "works with an array being passed", () => {
		let paths = [ "/a", "/a/b", "/a/c/b" ]
		expect ( dcf ( paths ) ).to.equal ("/a/")
	})
})

describe ( "edge cases for paths", () => {
	it ( "works when an empty array is passed", () => {
		expect ( dcf ( [] ) ).to.equal ("/")
	})
	it ( "works when one absolute path is passed", () => {
		expect ( dcf ( [ "/a" ] ) ).to.equal ("/a/")
	})
	it ( "works when all the same paths are passed", () => {
		expect ( dcf ( [ "/a/b", "/a/b", "/a/b" ] ) ).to.equal ("/a/b/")
	})
	it ( "works when no common folder is present other than /", () => {
		expect ( dcf ( [ "/f/b", "/i/b", "/m/b/i" ] ) ).to.equal ("/")
	})
})

describe ( "make sure trailing slashes have no effect", () => {
	it ( "should not matter if all of them have slashes", () => {
		let paths = [ "/a/", "/a/b/", "/a/c/b/" ]
		expect ( dcf ( paths ) ).to.equal ("/a/")
	})
	it ( "should not matter if none of them have slashes", () => {
		let paths = [ "/a", "/a/b", "/a/c/b" ]
		expect ( dcf ( paths ) ).to.equal ("/a/")
	})
	it ( "should not matter if some them have slashes", () => {
		let paths = [ "/a", "/a/b/", "/a/c/b/" ]
		expect ( dcf ( paths ) ).to.equal ("/a/")
	})
})

describe ( "make sure relative paths work", () => {
	it ( "should return the absolute path", () => {
		let paths = [ "./", "." ]
		expect ( dcf ( paths ) ).to.equal ( __dirname + "/" )
	})
	it ( "should work with all relative paths", () => {
		let path = require ("path")
		let paths = [ "../", "./", "." ]
		expect ( dcf ( paths ) ).to.equal ( path.dirname ( __dirname ) + "/" )
	})
	it ( "should work with some relative paths", () => {
		let paths = [ "../", "../", "/a", "b" ]
		expect ( dcf ( paths ) ).to.equal ("/")
	})
	it ( "should work with all relative paths without dots", () => {
		let paths = [ "a", "b", "c", "d" ]
		expect ( dcf ( paths ) ).to.equal ( __dirname + "/" )
	})
})
