# 1.6.0

    * New CLI API. `gravatar avatar` and `gravatar profile`, instead of only `gravatar`. (lwhiteley - layton.whiteley@gmail.com)
    * Suport Browser usage (goatandsheep)
    * Fix: handle null email case for profile_url (lwhiteley - layton.whiteley@gmail.com)

# 1.5.2

    * Support email with hash behind at symbol (lindell - https://github.com/lindell)

# 1.5.1

    * Fix a memory leak. Refs #30 (jefflembeck - https://github.com/jefflembeck)

# 1.5.0

    * New way to specify the protocol in the `options` object (rsp - https://github.com/rsp)

# 1.4.0

    * Basic CLI (zeke - https://github.com/zeke)

# 1.3.1

    * Enhancement: Detect MD5 hashes and not hash them again (opatut)

# 1.3.0

    * Implementing profiles (wlaurance - https://github.com/wlaurance)

# 1.2.0

     * According to https://en.gravatar.com/site/check/ https://s.gravatar.com/avatar/ is their preferred url.

# 1.1.1

    * Allow no protocol URL generation too. Closes #15

# 1.1.0

    * Allow invalid email to prevent blows. Closes #8, #13

# 1.0.6

    * Compatibility issue fix #6

# 1.0.5

    * Changed all tests to use mocha and should.js

# 1.0.4

    * Test script to avoid global nodeunit - Fix #4

# 1.0.3

    * Email trim (By Daniel Gasienica - @gasi) - Issue #2

# 1.0.2

    * Using index.js as main in package.json. This is a standard in npm

# 1.0.1

    * Defined lib/gravatar as main in package.json

# 1.0.0

    * Can generate gravatar URL
    * Basic test structure
    * Initial documentation
