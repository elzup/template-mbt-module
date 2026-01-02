///|
/// Add two integers
/// ```mbt test
/// inspect(add(1, 2), content="3")
/// inspect(add(-1, 1), content="0")
/// inspect(add(0, 0), content="0")
/// ```
pub fn add(a : Int, b : Int) -> Int {
  a + b
}

///|
/// Greet with a name
/// ```mbt test
/// inspect(greet("World"), content="Hello, World!")
/// inspect(greet("MoonBit"), content="Hello, MoonBit!")
/// ```
pub fn greet(name : String) -> String {
  "Hello, " + name + "!"
}
