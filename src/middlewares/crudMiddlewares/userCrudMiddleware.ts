import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import * as session from 'express-session';
import { tokenSecretKey } from '../../domains/user/authentication/authService.js';
import { userAuthLogSchemaExport } from '../../domains/user/authentication/authModel.js';
import { userRolesSchemaExport } from '../../domains/user/usercrud/userModel.js';


const userCrudMiddleware = (requiredRole: string[]) => {
    return async (req:Request,res:Response,next:NextFunction): Promise<any> => {
        const token = req.headers['authorization'];
        const authLog = userAuthLogSchemaExport;
        const userRoles = userRolesSchemaExport;
        let getLoggedUserData = undefined;
        
        try {
            if (token !== undefined && token !== null && tokenSecretKey && req.headers['authorization'] !== undefined && req.headers['authorization'] !== null) {
                jwt.verify(req.headers['authorization'], tokenSecretKey, async (err:any, token:any) => {
    
                    if (!req.session) {
                        return res.status(500).json({ error: 'Session is not initialized' });
                      }
                    if (err) {return res.status(401).json({error:'Session has expired.'});}
                    if (req.session.username && req.session.username !== null && req.session.username !== undefined) {
                        getLoggedUserData = await authLog.findOne({ username: token.username });
                        
    
                        if (getLoggedUserData !== undefined && getLoggedUserData !== null && getLoggedUserData.token !== req.headers['authorization'])
                            return res.status(401).json({ error: 'Access denied.' });
    
                        if(getLoggedUserData && getLoggedUserData.username !== req.session.username)
                            return res.status(401).json({ error: 'Access denied.' });
                        
                        
                        if(getLoggedUserData && getLoggedUserData.username && getLoggedUserData.username !== null && getLoggedUserData.username !== undefined){
                            const userRolesData = await userRoles.findOne({username: getLoggedUserData.username});                            
                            if (userRolesData && userRolesData.roles && userRolesData.roles !== null && userRolesData.roles !== undefined && userRolesData.roles.length > 0) {

                                 let permissionControl:boolean=false;
                                userRolesData.roles.forEach(element => {
                                    if (requiredRole.includes(element)) {
                                        if (element === 'user' && userRolesData.roles.includes(element)){
                                            permissionControl=true;
                                        }
                                        if (userRolesData.roles.includes('admin') || userRolesData.roles.includes('moderator')){
                                            permissionControl=true;
                                        }
                                    }
                                });
                                
                                if(!permissionControl)
                                    return res.status(401).json({ error: 'Access denied.3' });
                                else
                                    next();
                                
                            } else {
                                await new userRoles({username: req.session.username, roles: ['user']}).save();
                                next();
                            }
                            
                        } else {
                            return res.status(401).json({ error: 'Access denied.' });
                        }

                        
                    } else
                    return res.status(401).json({ error: 'Access denied.' });
                });
            } else
                return res.status(401).json({ error: 'Access denied.' });
            
            
    
        } catch (error) {
            return res.status(401).json({ error: 'Access denied.' });
        }
    }
}

export default userCrudMiddleware;