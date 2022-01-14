import React from "react";
import { 
    Container, 
    Header, 
    UserInfo, 
    Photo, 
    User, 
    UserGreting, 
    UserName 
} from './styles'

export function Dashboard() {
    return (
        <Container>
            <Header> 
                <UserInfo>
                    <Photo source={{uri: 'https://avatars.githubusercontent.com/u/21689807?v=4'}}/>
                    <User>
                        <UserGreting>Olá, </UserGreting>
                        <UserName>Felipe</UserName>
                    </User>
                </UserInfo>
            </Header>
        </Container>
    )
}
