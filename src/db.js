//DEMO DATA//
const users = [
    {
        id:'1',
        name:"Anurag",
        email:'anuragv.1020@gmail.com',
        age:20
   },
   {
        id:'2',
        name:"Monica",
        email:'monica@friends.com',
        age:23
   },
   {
        id:'3',
        name:"Chandlar",
        email:'isthisismymail@friends.com',
        age:24
   }
];
const posts = [
    {
        id:'10',
        title:'LOL I\'m still alive',
        body:'Idk',
        published: false,
        author: '1'
    },{
        id:'20',
        title:'Hmm..something is still missing',
        body:'whatever.. I\'ll still publish it',
        published: true,
        author: '2'
    },{
        id:'30',
        title:'lul everyone is going mad!blah',
        body:'I\'ll not publish this postblah',
        published: true,
        author: '3'
    },{
        id: '40',
        title:'F.R.I.E.N.D.S',
        body:"GraphQL is amazing!",
        published:true,
        author:'2'
    }
];
const comments = [
    {
        id:'101',
        text:"Wow amazing!!",
        author: '1',
        post:'10'
    },
    {
        id:'102',
        text:'Great post',
        author: '1',
        post:'30'
    },
    {
        id:'103',
        text:'hmm.. okishh!',
        author: '2',
        post:'10'
    },
    {
        id:'104',
        text:'xD',
        author: '3',
        post:'40'
    }
];
////////////

const db = {
    users,
    posts,
    comments
}

export { db as default }