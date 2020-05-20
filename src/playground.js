// app.get('/product', (req,res) => {
//     //to make some query compulsary and some not
//     if(!req.query.search){
//         return res.send({
//             error: 'You must provide search term'
//         })
//     }
//     console.log(req.query.search)//to get query 
//     res.send({
//         products: []
//     })
// })