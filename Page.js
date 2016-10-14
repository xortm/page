/**
 * 分页组件
 */

export default class DopPage extends React.Component {
    constructor(props) {
        //由父级组件传入属性：page：当前页，total：总页数
        super(props);
        this.state = {
            current:props.page,
            value: ''
        };
        //绑定上一页、下一页、点击方法
        this.handClick = this.handClick.bind(this);
        this.goNext = this.goNext.bind(this);
        this.goPrev = this.goPrev.bind(this);
    }

    handClick(num) {
        this.state={current: num};
        this.props.onClick(num);

        if (pageConfig.listType == 'search') {
            var attr = {"more": "more"};
            page_sdk('search',attr);
        } else {
            var attr = {"page_url": "more.html", "title": "点击更多：more.html"};
            page_sdk('page_view',attr);

        }

    }

    goNext() {
        if(this.state.current<this.props.total){
            let cur = this.props.page+1;
            this.state={current: cur };
            this.props.goNext(cur);

            if (pageConfig.listType == 'search') {
                var attr = {"more": "more"};
                page_sdk('search',attr);
            } else {
                var attr = {"page_url": "more.html", "title": "点击更多：more.html"};
                page_sdk('page_view',attr);

            }

        }

    }
    goPrev() {
        if(this.state.current>1) {
            let cur = this.props.page - 1;
            this.state = {current: cur};
            this.props.goPrev(cur);

            if (pageConfig.listType == 'search') {
                var attr = {"more": "more"};
                page_sdk('search',attr);
            } else {
                var attr = {"page_url": "more.html", "title": "点击更多：more.html"};
                page_sdk('page_view',attr);

            }
            
        }

    }
    render() {
        let self = this;
        let total = this.props.total;//总页数
        let cur = this.props.page;//当前页
        let items = [];//页码组
        let begin;//开始的第一个页码
        let len;//页码个数
        let key=0;
        //页码展示逻辑
        if (total > 7) {//总页数>7时，最多显示7页
            len = 7;
            if (cur >= (total - 3)) {//当前页码>=总页数-3时，第一个页码为总页数-6
                begin = total - 6;
            } else if (cur <= 3) {//当前页码<=3时,第一个页码为1
                begin = 1;
            } else {
                begin = cur - 3;
            }
        } else {//总页数<=7时，显示全部，第一个页码为1
            len = total;
            begin = 1;
        }
        for (let i = 0; i < len; i++) {//页码组
            let showI = begin + i;//显示出的页码
            if (cur == showI) {
                items.push({num: showI, cur: true});
            } else {
                items.push({num: showI, cur: false});
            }
        }
        if (this.props.total >= 9) {
            if(cur<6){
                if(cur<5){
                    return (
                        <div className="ui-pagnation">
                            <a  className={this.props.page == 1 ? 'prev disable' : 'prev'} onClick={this.goPrev}></a>
                            <span className="pagnation-cols">

                   {
                       items.map(function (item,index) {

                           return <a  key={'b'+index} onClick={self.handClick.bind(self, item.num)} className={item.cur ? 'num current' : 'num'}>
                                    {item.num}
                           </a>
                       })
                       }
                                <a>...</a>
                                <a  onClick={self.handClick.bind(self, total)}
                                    className='num'  >{total}</a>
                            </span>
                            <a  className={this.props.page == this.props.total ? 'next disable' : 'next'} onClick={this.goNext}></a>
                        </div>
                    )

                }else{
                    return (
                        <div className="ui-pagnation">
                            <a  className={this.props.page == 1 ? 'prev disable' : 'prev'} onClick={this.goPrev}></a>
                            <span className="pagnation-cols">
                                <a  onClick={self.handClick.bind(self, 1)}
                                    className='num'  >1</a>

                   {
                       items.map(function (item,index) {

                           return <a  key={'b'+index} onClick={self.handClick.bind(self, item.num)} className={item.cur ? 'num current' : 'num'}>
                                    {item.num}
                           </a>
                       })
                       }
                                <a>...</a>
                                <a  onClick={self.handClick.bind(self, total)}
                                    className='num'  >{total}</a>
                            </span>
                            <a  className={this.props.page == this.props.total ? 'next disable' : 'next'} onClick={this.goNext}></a>
                        </div>
                    )
                }
            }else if(cur>(total - 4)){
                return (
                    <div className="ui-pagnation">
                        <a  className={this.props.page == 1 ? 'prev disable' : 'prev'} onClick={this.goPrev}></a>
                        <span className="pagnation-cols">
                            <a  onClick={self.handClick.bind(self, 1)}
                                className='num' >1</a>
                            <a>...</a>
                   {
                       items.map(function (item,index) {

                           return <a   key={'b'+(key++)} onClick={self.handClick.bind(self, item.num)}  key={'b'+index}
                               className={item.cur ? 'num current' : 'num'}>
                                           {item.num}
                           </a>
                       })
                       }
                        </span>
                        <a  className={this.props.page == this.props.total ? 'next disable' : 'next'} onClick={this.goNext}></a>
                    </div>
                )
            }else{
                return (
                    <div className="ui-pagnation">
                        <a  className={this.props.page == 1 ? 'prev disable' : 'prev'} onClick={this.goPrev}></a>
                        <span className="pagnation-cols">
                            <a onClick={self.handClick.bind(self, 1)}
                                className='num'  >1</a>
                            <a>...</a>
                   {
                       items.map(function (item,index) {

                           return <a  onClick={self.handClick.bind(self, item.num)}  key={'b'+index}
                               className={item.cur ? 'num current' : 'num'}>
                                           {item.num}
                           </a>
                       })
                       }
                            <a>...</a>
                            <a  onClick={self.handClick.bind(self, total)}
                                className='num'>{total}</a>
                        </span>
                        <a  className={this.props.page == this.props.total ? 'next disable' : 'next'} onClick={this.goNext}></a>
                    </div>
                )
            }

        }
        else {
            if (this.props.total > 1) {
                return (
                    <div className="ui-pagnation">
                        <a className={this.props.page == 1 ? 'prev disable' : 'prev'} onClick={this.goPrev}></a>
                        <span className="pagnation-cols">
                   {
                       items.map(function (item, index) {
                           return <a key={'b' + index} onClick={self.handClick.bind(self, item.num)}
                               className={item.cur ? 'num current' : 'num'}>
                                           {item.num}
                           </a>
                       })
                       }
                        </span>
                        <a className={this.props.page == this.props.total ? 'next disable' : 'next'} onClick={this.goNext}></a>
                    </div>
                )
            }else{
                return(
                    <div></div>
                )
            }

        }


    }
}

