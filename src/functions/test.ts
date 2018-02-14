function one(){
  const _this = this
  return {
    two(){
      return _this()
    },

    three(){
      console.log('ok')
    }
  }
}

one().two()