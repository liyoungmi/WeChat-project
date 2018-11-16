let fileData = require('../../utils/goods.js');
let timeId =null;
Page({
    data: {
        history: [],
        hot: ['女鞋', '苹果手表', '座椅'],
        //搜索结果
        result: null,

        showKeywords: false,

        //搜索关键词
        keywords: null,

        value: '',
        showResult: false,
    },

    cancelSearch() {
        this.setData({
            showResult: false,
            showKeywords: false,
            value: ''
        })
    },
    searchInput(e) {  
      console.log(e.detail.value)
      
 
      let length = fileData.mtData().list.length;
  
      let titleStr = [];
      console.log(titleStr)

    
      for (let i = 0; i<length;i++){
        let title = fileData.mtData().list[i].title;
        let position = title.search(e.detail.value);        
        console.log(position)
        
              
        if (position > 0){ 
          console.log(title)       
          titleStr.push(title);
        } else if (position = 0){
          console.log('出现则代表')
        }   
      }

      if (titleStr.length > 0){
        this.setData({
        keywords: titleStr,
        showKeywords: false,
      })
      }
        if (!this.data.showKeywords) {
          timeId && clearTimeout(timeId);
          timeId = setTimeout(() => {
              this.setData({
                showKeywords: true
              })
            }, 500)
          }  
    },
    keywordHandle(e) {
      console.log(e)
        const text = e.target.dataset.text;
        const length = fileData.mtData().list.length;
        const result = [];
        console.log(result)
        for(let i=0; i<length; i++){
          const title = fileData.mtData().list[i];  
              
          if (title.title == text){
            console.log(title);  
            result.push(title);
          }
        }
      
      fileData.mtData().list
        this.setData({
            result: result,
            value: text,
            showKeywords: false,
            showResult: true
        })
        this.historyHandle(text);
    },
    historyHandle(value) {
        let history = this.data.history;
        const idx = history.indexOf(value);
        if (idx === -1) {
            // 搜索记录只保留8个
            if (history.length > 7) {
                history.pop();
            }
        } else {
            history.splice(idx, 1);
        }
        history.unshift(value);
        wx.setStorageSync('history', JSON.stringify(history));
        this.setData({
            history
        });
    },
    onLoad() {
        const history = wx.getStorageSync('history');
        if (history) {
            this.setData({
                history: JSON.parse(history)
            })
        }
    }
})