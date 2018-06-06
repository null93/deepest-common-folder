const path = require ("path")

function deepestCommonFolder ( paths ) {
	// Sanitize and normalize data
	let data = paths
		.map ( p => path.resolve ( p ) )
		.map ( p => path.normalize ( p ) )
		.map ( p => p.replace ( /^\/|$\//g, "" ) )
		.map ( p => p.split ("/") )
	// If empty array is passed, return root directory
	if ( data.length == 0 ) return "/"
	// Initialize traversal variables and helper functions
	let same = ( i ) => !i.includes ( false ) && i.every ( j => j === i [ 0 ] )
	let next = ( i ) => i.map ( j => j.length > 0 ? j.shift () : false )
	let base = "/"
	// Traverse through data and build base path
	for ( let i = next ( data ); same ( i ); i = next ( data ) ) {
		base += i [ 0 ] + "/"
	}
	// Return the normalized base directory
	return path.normalize ( base )
}

function validate ( paths, callback ) {
	if ( !Array.isArray ( paths ) ) {
		throw "Expecting array of paths to be passed"
	}
	else {
		return callback ( paths )
	}
}

module.exports = paths => validate ( paths, deepestCommonFolder )
