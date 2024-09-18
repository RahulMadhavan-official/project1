 import jwt from 'jsonwebtoken';

 export const checkToken = roleArray=> {
    return (req, res, next) => {
      const bToken = req.headers.authorization;
  
      if (!bToken) {
        res.status(403).json({ message: 'You are not Authorized' });
      }
  
      const token = bToken.split(' ')[1];
  
      try {
        const isValid = jwt.verify(
          token, 
          'uftagkayf'
          );
        if (!roleArray.include(isValid.role)) {
          res.status(403).json({ message: 'You are not Authorized 2' });
        }
      } catch (error) {
        res.status(403).json({ message: 'You are not Authorized 3' });
      }
      next();
    };
  };