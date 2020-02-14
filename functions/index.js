const functions = require('firebase-functions');
const admin = require("firebase-admin");
const app = require("express")();

admin.initializeApp();
const db = admin.firestore().collection("prospectados");

app.get("/veroapp/retornaprospectos",  (request, response)=> {
    db.get()
      .then((docs) => {
        let prospectos = [];
        docs.forEach((doc) =>{
          prospectos.push({
            id: doc.id,
            nome: doc.data().nome,
            bairro: doc.data().bairro,
            cep: doc.data().cep,
            cidade: doc.data().cidade,
            cpf: doc.data().cpf,
            datanasc: doc.data().datanasc,
            email: doc.data().email,
            nome_mae: doc.data().nome_mae,
            num: doc.data().num,
            rg: doc.data().rg,
            rua: doc.data().rua,
            uf: doc.data().uf,
            fone: doc.data().fone
          })
        })
        return response.json(prospectos);
      })
      .catch(error => { response.json({ general: error}) });
  })
  app.post("/veroapp/novo/prospecto",(request, response)=> {
    db.add({ nome: request.body.nome,
            nome_mae: request.body.nome_mae,
            datanasc:request.body.datanasc,
            cpf:request.body.cpf,
            rg:request.body.rg,
            fone:request.body.fone,
            email:request.body.email,
            rua:request.body.rua,
            bairro:request.body.bairro,
            cep: request.body.cep,
            cidade:request.body.cidade,
            uf:request.body.uf,
            num:request.body.num,
    })
      .then(()=> {
       return response.json({ general: "Cadastro de Prospecto Salvo!"});
      })
      .catch(error => { response.json({ general: error}) });
  })

exports.apivero = functions.https.onRequest(app)
