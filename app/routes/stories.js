const express= require('express');
const router = express.Router();
const {Story}= require('../models/Story');
const {ensureAuthenticated}= require('../helpers/auth');




router.get('/',(req,res)=>{
  Story.find({status:"public"})
    .sort({date:'desc'})
    .populate('user')
    .then(story=>{
      res.render('story/index',{
        story:story
      });
     
    })

  
});

router.get('/user/:id',(req,res)=>{
  Story.find({user:req.params.id,status:'public'})
    .sort({date:'desc'})
    .populate('user')
    .then(story=>{
      res.render('story/index',{
        story:story
      });
     
    })

   
});
router.get('/my',(req,res)=>{
  Story.find({user:req.user.id})
    .sort({date:'desc'})
    .populate('user')
    .then(story=>{
      res.render('story/index',{
        story:story
      });
     
    })

  });




router.get('/add',ensureAuthenticated,(req,res)=>{
  res.render('story/add');
});
router.post('/',ensureAuthenticated,(req,res)=>{

 let allowCommets;
 if(req.body.allowCommets){
  allowCommets=true;
 }else{
  allowCommets=false;
 }
  const story={
    title:req.body.title,
    body:req.body.body,
    status:req.body.status,
    allowCommets:allowCommets,
    user:req.user.id
  }

  new Story(story)
    .save()
    .then(()=>{
      res.redirect('/stories');
    });

});

router.get('/edit/:id',ensureAuthenticated,(req,res)=>{
  Story.findById(req.params.id)
    .then((story)=>{

      if(story.user!=req.user.id){
       res.redirect('/stories');
      }else{
        res.render('story/edit',{
          story:story
         
        });
      }
     

      
    })
  
})

router.put('/:id',(req,res)=>{
  Story.findById(req.params.id)
    .then(story=>{
      
 let allowCommets;
 if(req.body.allowCommets){
  allowCommets=true;
 }else{
  allowCommets=false;
 }
  
    story.title=req.body.title;
    story.body=req.body.body;
    story.status=req.body.status;
    story.allowCommets=allowCommets;
    
  

  
    story.save()
    .then(()=>{
      res.redirect('/dashboard');
    });

    })

   
});

router.delete('/:id',ensureAuthenticated,(req,res)=>{
  Story.deleteOne({_id:req.params.id})
    .then((result)=>{
      res.redirect('/dashboard')
      
    }).catch((err)=>{
      console.log(err);
    })

    
        
});

router.get('/show/:id',(req,res)=>{
  Story.findById(req.params.id)
    .populate('comments.commentUser')
    .populate('user')
    .then(story=>{
      res.render('story/show',{
        story:story
        
      });
    
    })

  
});


// post comments

router.post('/comment/:id',ensureAuthenticated,(req,res)=>{
  Story.findById(req.params.id)
    .then((story)=>{
     const newComment={
      commentBody:req.body.commentBody,
      commentUser:req.user.id
      
     }

     story.comments.unshift(newComment);

     story.save()
      .then(()=>{
        res.redirect('/stories/show/'+req.params.id);
      })
      

    })
    
})

module.exports= router;