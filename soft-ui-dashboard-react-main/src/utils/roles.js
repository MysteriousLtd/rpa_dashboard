const Roles={
    SUPER_ADMIN: 'SUPER_ADMIN',
    Client_Sofabed: {
        ADMIN: 'Client_Sofabed_ADMIN',
        MANAGER: 'Client_Sofabed_MANAGER',
        GUEST: 'Client_Sofabed_GUEST'
    },
    Client_Jennifer: {
        ADMIN: 'Client_Jennifer_ADMIN',
        MANAGER: 'Client_Jennifer_MANAGER',
        GUEST: 'Client_Jennifer_GUEST'
    },
    Client_Jennihome:{
        ADMIN: 'Client_Jennihome_ADMIN',
        MANAGER: 'Client_Jennihome_MANAGER',
        GUEST: 'Client_Jennihome_GUEST'
    }
};

export default Roles
//   var getPermissions=[]
//   function getKeys(pKey,object1){
//     for (const [key, val] of Object.entries(object1)) {
//       // console.log(val)
//     if(typeof val==='object'){
//       getKeys(key,val)
//     }else{
//       if(pKey!==null)   console.log(pKey.key)
//       else return key;
//     }
    
//   }
//   }
  
//   getKeys(null,object1)
  