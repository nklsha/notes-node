module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "mocha": true,    
        "es2021": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "semi": ["warn", "always"],
        "quotes": ["error", "double"],
        "no-unused-vars": ["warn", "local"]
    }
  };