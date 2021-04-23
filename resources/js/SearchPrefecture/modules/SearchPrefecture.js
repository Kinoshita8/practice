
export default class SearchPrefecture {
    constructor(){
        this.$searchWordText = document.querySelector('#search-word-input');
        this.$prefectureList = Array.from(document.querySelectorAll('#prefecture-list button'));
        this.bind();
    }

    bind(){
        this.$searchWordText.addEventListener('keyup', ()=>{
            this.searchPrefecture();
        });
    }

    searchPrefecture(){
        const searchWord = this.$searchWordText.value;
        this.$prefectureList.forEach((element) =>{
            if(!searchWord || searchWord === ''){
                element.classList.remove('hide');
                return;
            }
            const prefectureName = element.dataset.name;
            const phonetic = element.dataset.phonetic;

            if(searchWord.charAt(0) === prefectureName.charAt(0) || searchWord.charAt(0) === phonetic.charAt(0)){
                element.classList.remove('hide');
            }else{
                element.classList.add('hide');
            }
        });
    }
}