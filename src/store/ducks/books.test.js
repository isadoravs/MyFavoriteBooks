const books = require("./books")
// @ponicode
describe("books.getBooks", () => {
    test("0", () => {
        let callFunction = () => {
            books.getBooks("Elio")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            books.getBooks("Dillenberg")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            books.getBooks("elio@example.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            books.getBooks(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("books.addFavorite", () => {
    test("0", () => {
        let callFunction = () => {
            books.addFavorite("dummy_name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            books.addFavorite("dummyName")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            books.addFavorite("dummyName123")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            books.addFavorite("/dummy_name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            books.addFavorite("$dummy_name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            books.addFavorite(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("books.removeFavorite", () => {
    test("0", () => {
        let callFunction = () => {
            books.removeFavorite("$dummy_name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            books.removeFavorite("dummyname")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            books.removeFavorite("dummy_name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            books.removeFavorite("DUMMYNAME")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            books.removeFavorite("dummyName123")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            books.removeFavorite(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
