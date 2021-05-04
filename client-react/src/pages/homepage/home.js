import React, {useRef} from 'react'
import { makeStyles } from '@material-ui/core/styles';

import HeaderPage from './../shared/header'
import FooterPage from './../shared/footer'
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

const useStyles = makeStyles((theme) => ({
    layout: {
        minHeight: "100vh",
        width: "100%"
    },
    content : {
      background:"#fff",
      padding: "40px",
      textAlign: "justify",
    },
    box :{
        margin: "20px",
        border: "2px solid green", 
        padding: "60px",
    }
}));

export default function HomePage() {
    const classes = useStyles();
    return (
        <>
        <Layout className={classes.layout}>
            <Header><HeaderPage/></Header>
            <Content className={classes.content}>
                <div className={classes.box} >
                    <h3>Home</h3>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Aenean ut ligula consectetur, volutpat ligula ut, volutpat nisl. Quisque 
                    a mi lectus. Integer convallis velit eu nunc rhoncus interdum. Sed 
                    facilisis a enim ac blandit. Fusce pulvinar magna tellus, sed 
                    porttitor justo dignissim at. Donec commodo et massa eu posuere. 
                    Vestibulum et turpis sollicitudin, aliquet elit quis, ultrices nisi. 
                    Vestibulum id molestie quam. Sed vitae consequat eros. Donec finibus, 
                    odio at placerat rhoncus, tellus nisi dapibus neque, eu congue arcu diam et augue.
                    Donec ut lorem pulvinar, accumsan neque eu, finibus elit. Etiam vel justo tincidunt, 
                    rutrum elit nec, varius ante. Donec tempus sem non purus posuere pretium. Donec eget 
                    fringilla turpis. Quisque gravida, turpis finibus commodo viverra, orci neque accumsan 
                    dui, id porta arcu augue molestie ipsum. Vivamus sed urna nec ex sollicitudin luctus. 
                    Fusce vel neque ullamcorper, venenatis purus laoreet, vehicula nulla. Lorem ipsum dolor sit amet, 
                    consectetur adipiscing elit. Duis vel euismod dolor.
                </div>
                <div className={classes.box} >
                    <h3>About</h3>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Aenean ut ligula consectetur, volutpat ligula ut, volutpat nisl. Quisque 
                    a mi lectus. Integer convallis velit eu nunc rhoncus interdum. Sed 
                    facilisis a enim ac blandit. Fusce pulvinar magna tellus, sed 
                    porttitor justo dignissim at. Donec commodo et massa eu posuere. 
                    Vestibulum et turpis sollicitudin, aliquet elit quis, ultrices nisi. 
                    Vestibulum id molestie quam. Sed vitae consequat eros. Donec finibus, 
                    odio at placerat rhoncus, tellus nisi dapibus neque, eu congue arcu diam et augue.
                    Donec ut lorem pulvinar, accumsan neque eu, finibus elit. Etiam vel justo tincidunt, 
                    rutrum elit nec, varius ante. Donec tempus sem non purus posuere pretium. Donec eget 
                    fringilla turpis. Quisque gravida, turpis finibus commodo viverra, orci neque accumsan 
                    dui, id porta arcu augue molestie ipsum. Vivamus sed urna nec ex sollicitudin luctus. 
                    Fusce vel neque ullamcorper, venenatis purus laoreet, vehicula nulla. Lorem ipsum dolor sit amet, 
                    consectetur adipiscing elit. Duis vel euismod dolor.
                </div>
                <div className={classes.box} >
                    <h3>Contact</h3>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Aenean ut ligula consectetur, volutpat ligula ut, volutpat nisl. Quisque 
                    a mi lectus. Integer convallis velit eu nunc rhoncus interdum. Sed 
                    facilisis a enim ac blandit. Fusce pulvinar magna tellus, sed 
                    porttitor justo dignissim at. Donec commodo et massa eu posuere. 
                    Vestibulum et turpis sollicitudin, aliquet elit quis, ultrices nisi. 
                    Vestibulum id molestie quam. Sed vitae consequat eros. Donec finibus, 
                    odio at placerat rhoncus, tellus nisi dapibus neque, eu congue arcu diam et augue.
                    Donec ut lorem pulvinar, accumsan neque eu, finibus elit. Etiam vel justo tincidunt, 
                    rutrum elit nec, varius ante. Donec tempus sem non purus posuere pretium. Donec eget 
                    fringilla turpis. Quisque gravida, turpis finibus commodo viverra, orci neque accumsan 
                    dui, id porta arcu augue molestie ipsum. Vivamus sed urna nec ex sollicitudin luctus. 
                    Fusce vel neque ullamcorper, venenatis purus laoreet, vehicula nulla. Lorem ipsum dolor sit amet, 
                    consectetur adipiscing elit. Duis vel euismod dolor.
                </div>
            </Content>
            <Footer><FooterPage/></Footer>
        </Layout>
        </>
    )
}