test "add" {
  assert_eq!(add(1, 2), 3)
  assert_eq!(add(-1, 1), 0)
  assert_eq!(add(0, 0), 0)
}

test "greet" {
  assert_eq!(greet("World"), "Hello, World!")
  assert_eq!(greet("MoonBit"), "Hello, MoonBit!")
}
