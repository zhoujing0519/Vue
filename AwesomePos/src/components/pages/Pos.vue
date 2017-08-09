<template>
  <div class="pos">
      <el-row>
          <!-- 订单栏 -->
          <el-col :span="7" class="pos-order" id="orderList">
            <el-tabs>
                <el-tab-pane label="点餐">
                    <el-table :data="tableData" border style="width=100%;">
                        <el-table-column prop="goodsName" label="商品名称"></el-table-column>
                        <el-table-column prop="count" label="数量" width="70"></el-table-column>
                        <el-table-column prop="price" label="金额" width="70"></el-table-column>
                        <el-table-column label="操作" width="100">
                            <template scope="scope">
                                <el-button type="text" size="small" @click="delSingleGoods(scope.row)">删除</el-button>
                                <el-button type="text" size="small" @click="addOrderList(scope.row)">增加</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="total">
                        <small>数量：</small>{{totalCount}}
                        <small>金额：</small>{{totalMoney}}<small>元</small>
                    </div>
                    <div class="controls">
                        <el-button type="warning">挂单</el-button>
                        <el-button type="danger" @click="delAllGoods">删除</el-button>
                        <el-button type="success" @click="checkout">结账</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="挂单">
                    挂单
                </el-tab-pane>
                <el-tab-pane label="外卖">
                    外卖
                </el-tab-pane>
            </el-tabs>
          </el-col>
          <!-- 商品栏 -->
          <el-col :span="17" class="pos-item">
              <!-- 常用商品 -->
              <div class="common-goods">
                  <div class="title">常用商品</div>
                  <div class="common-goods-list">
                      <ul>
                          <li v-for="goods in commonGoodsData" @click="addOrderList(goods)">
                              <span v-text="goods.goodsName"></span>
                              <span class="common-price">￥{{goods.price}}元</span>
                          </li>
                      </ul>
                  </div>
              </div>
              <!-- 商品分类 -->
              <div class="goods-type">
                  <el-tabs>
                      <el-tab-pane label="汉堡">
                          <ul class="goods-list">
                              <li v-for="goods in type0Goods" @click="addOrderList(goods)">
                                  <span class="goods-img"><img :src="goods.goodsImg"></span>
                                  <span class="goods-name" v-text="goods.goodsName">香辣鸡腿堡</span>
                                  <span class="goods-price">￥{{goods.price}}元</span>
                              </li>
                          </ul>
                      </el-tab-pane>
                      <el-tab-pane label="小食">
                          <ul class="goods-list">
                              <li v-for="goods in type1Goods" @click="addOrderList(goods)">
                                  <span class="goods-img"><img :src="goods.goodsImg"></span>
                                  <span class="goods-name" v-text="goods.goodsName">香辣鸡腿堡</span>
                                  <span class="goods-price">￥{{goods.price}}元</span>
                              </li>
                          </ul>
                      </el-tab-pane>
                      <el-tab-pane label="饮料">
                          <ul class="goods-list">
                              <li v-for="goods in type2Goods" @click="addOrderList(goods)">
                                  <span class="goods-img"><img :src="goods.goodsImg"></span>
                                  <span class="goods-name" v-text="goods.goodsName">香辣鸡腿堡</span>
                                  <span class="goods-price">￥{{goods.price}}元</span>
                              </li>
                          </ul>
                      </el-tab-pane>
                      <el-tab-pane label="套餐">
                          <ul class="goods-list">
                              <li v-for="goods in type3Goods" @click="addOrderList(goods)">
                                  <span class="goods-img"><img :src="goods.goodsImg"></span>
                                  <span class="goods-name" v-text="goods.goodsName">香辣鸡腿堡</span>
                                  <span class="goods-price">￥{{goods.price}}元</span>
                              </li>
                          </ul>
                      </el-tab-pane>
                  </el-tabs>
              </div>
          </el-col>
      </el-row>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'pos',
  data(){
      return {
          tableData: [],
          commonGoodsData: [],
          type0Goods: [],
          type1Goods: [],
          type2Goods: [],
          type3Goods: [],
          totalMoney: 0,
          totalCount: 0,
      }
  },
  created(){
      // 调用接口，获取常用商品数据
      axios.get('http://jspang.com/DemoApi/oftenGoods.php')
      .then(response => {
          this.commonGoodsData = response.data;
      })
      .catch(error => {
          alert('网络错误，不能访问！');
      });

      // 调用接口，获取分类商品数据
      axios.get('http://jspang.com/DemoApi/typeGoods.php')
      .then(response => {
          this.type0Goods = response.data[0];
          this.type1Goods = response.data[1];
          this.type2Goods = response.data[2];
          this.type3Goods = response.data[3];
      })
      .catch(error => {
          alert('网络错误，不能访问！');
      });
  },
  mounted(){
    // 设置订单高度
      var orderHeight = document.body.clientHeight;
      document.getElementById('orderList').style.height = orderHeight + 'px';
  },
  methods: {
      // 添加商品至订单列表
      addOrderList(goods){
        // 商品是否已经存在于订单列表中
        let isIn = false;
        this.tableData.forEach(function(data, index){
            if(data.goodsId == goods.goodsId) isIn = true;
        });
        // 根据判断的值编写业务逻辑
        if(isIn){
            let arr = this.tableData.filter(a => a.goodsId == goods.goodsId);
            arr[0].count++;
        }else{
            let newGoods = {
                goodsId: goods.goodsId,
                goodsName: goods.goodsName,
                price: goods.price,
                count: 1
            };
            this.tableData.push(newGoods);
        }

        this.calTotal();
      },

      // 删除单个商品
      delSingleGoods(goods){
          this.tableData.splice(goods, 1);
          this.calTotal();
      },

      // 删除所有商品
      delAllGoods(){
          this.tableData = [];
          this.totalMoney = 0;
          this.totalCount = 0;
      },

      // 计算金额和数量
      calTotal(){
          // 清零
          this.totalMoney = 0;
          this.totalCount = 0;

          // 计算总金额
          this.tableData.forEach((element) => {
              this.totalCount += element.count;
              this.totalMoney = this.totalMoney + (element.price * element.count);
          });
      },

      // 模拟结账
      checkout(){
          if(this.totalCount != 0){
              this.tableData = [];
              this.totalCount = 0;
              this.totalMoney = 0;
              this.$message({
                  message: '结账成功，感谢您又为店里出了一份力量！',
                  type: 'success'
              });
          }else{
              this.$message.error('不能空结，老板了解你急切的心情！');
          }
      },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .pos-order{
        background-color: #f9fafc;
        border-right: 1px solid #c0ccda;
    }

    .total{
        background-color: #fff;
        padding: 10px;
        border-bottom: 1px solid #c0ccda;
    }

    .controls{
        margin-top: 10px;
    }

    .title{
        height: 20px;
        border-bottom: 1px solid #d3dce6;
        background-color: #f9fafc;
        padding: 10px;
        text-align: left;
    }

    .common-goods-list ul li{
        list-style: none;
        float: left;
        border: 1px solid #d3dce6;
        padding: 10px;
        margin: 10px;
        background-color: #fff;
        cursor: pointer;
        user-select: none;
    }

    .common-price{
        color: #58b7ff;
    }

    .goods-type{
        clear: both;
    }

    .goods-type li{
        list-style: none;
        width: 23%;
        border: 1px solid #e5e9f2;
        height: auto;
        overflow: hidden;
        background-color: #fff;
        padding: 2px;
        float: left;
        margin: 2px;
        cursor: pointer;
        user-select: none;
    }

    .goods-type li span{
        display: block;
        float: left;
    }

    .goods-img{
        width: 40%;
    }

    .goods-img img{
        width: 100%;
    }

    .goods-name{
        font-size: 16px;
        padding-left: 10px;
        color: brown;
    }

    .goods-price{
        font-size: 16px;
        padding-left: 10px;
        padding-top: 10px;
    }
</style>
