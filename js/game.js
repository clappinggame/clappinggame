var aa=000,bb=000,aq=0,bq=0,r=0,rd=1,winr=1,dead=0;
var awin=0,bwin=0,winpa=100,over=0;
var bt000=document.getElementById("t000");
var bt100=document.getElementById("t100");
var bt101=document.getElementById("t101");
var bt102=document.getElementById("t102");
var bt103=document.getElementById("t103");
var bt104=document.getElementById("t104");
var bt210=document.getElementById("t210");
var bt220=document.getElementById("t220");
var bt230=document.getElementById("t230");
var bt310=document.getElementById("t310");
var bt320=document.getElementById("t320");
var bt330=document.getElementById("t330");
var bt410=document.getElementById("t410");
var bt411=document.getElementById("t411");
var bt412=document.getElementById("t412");
var bt413=document.getElementById("t413");
var bt414=document.getElementById("t414");
var bt520=document.getElementById("t520");
var bt521=document.getElementById("t521");
var bt522=document.getElementById("t522");
var bt535=document.getElementById("t535");
var bt630=document.getElementById("t630");
var bt641=document.getElementById("t641");
var bt642=document.getElementById("t642");
var bt655=document.getElementById("t655");
var bt180=document.getElementById("t180");
var bt250=document.getElementById("t250");
var bt420=document.getElementById("t420");
function rnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

//cg判断区
function t(a)//t=type 0气 1防御 2反 3弓 4攻击
{
    var b=Math.floor(a/100);
    if(b>3)b=4;
    return b;
}
function c(a)//c=cost
{
    var b=Math.floor((a/10))%10;
    if(b==1&&Math.floor(a/100)==1)b=0;
    if(b==1&&Math.floor(a/100)==5)b=3;
    if(a==180)b=1;
    if(a==250)b=0;
    if(a==000)b=-1;
    return b;
}
function a(a)//a=attack
{
    var b=Math.floor((a/10))%10;
    if(a==100)b=2;
    if(a==180)b=8;
    if(b==3&&Math.floor(a/100)==5)b=1;
    return b;
}
function d(a)//d=direction 0=中 1~4=上下左右 5=ALL 10=左至右 11上中 12下中 13上中下 14上中左右 15下中左右
{
    var b=Math.floor((a%100)%10);
    if(Math.floor(a/100)==5&&b==0) b=10;
    if(Math.floor(a/100)==5&&b==1) b=11;
    if(Math.floor(a/100)==5&&b==2) b=12;
    if(Math.floor(a/100)==6&&b==0) b=13;
    if(Math.floor(a/100)==6&&b==1) b=14;
    if(Math.floor(a/100)==6&&b==2) b=15;
    return b;
}

function pan(y,b)
{
    
    aq-=c(y);bq-=c(b);
    if(aq<0)
    {
        if(bq<0)
        {
            return 7;
        }
        else
        {
            return 8;
        }
    }
    else
    {
        if(bq<0)
        {
            return 9;
        }
    }




    //双方不爆气，开始正常判定
    if(t(y)<=2&&t(b)<=2)//双方t<2
    {
        if(y==250)
        {
            if(b==250)
            {
                return 3;
            }
            else
            {
                return 2;
            }
        }
        else
        {
            if(b==250)
            {
                return 1;
            }
            else
            {
                return 0;
            }
        }
    }
    else if(t(y)>=3&&t(b)==0)//我方攻击对方加气
    {
        if (d(y)>=1&&d(y)<=4) return 0;
        else return 1;
    }
    else if(t(y)==0&&t(b)>=3)//我方加气对方攻击
    {
        if (d(b)>=1&&d(b)<=4) return 0;
        else return 2;
    }
    else if(t(y)>=4&&t(b)>=4)//双方同时攻击
    {
        if(d(y)>=1&&d(y)<=4)
        {
            if(d(b)>=1&&d(b)<=4) return 0;
            else  return 2;
        }
        else
        {
            if(d(b)>=1&&d(b)<=4) return 1;
            else
            {
                if (a(y)>a(b)) return 1;
                else if (a(y)<a(b)) return 2;
                else return 0;
            }
        }

    }
    else if(t(y)==3&&t(b)==3)//双方同时弓
    {
        if (a(y)>a(b)) return 1;
        else if (a(y)<a(b)) return 2;
        else return 0;
    }
        else if(t(y)>=4&&t(b)==3)//我方攻击对方弓
    {
        if (a(y)>=a(b)) return 1;
        else if (a(y)<a(b)) return 2;
        else return 0;
    }
    else if(t(y)==3&&t(b)>=4)//我方弓对方攻击
    {

        if (a(y)>a(b)) return 1;
        else if (a(y)<=a(b)) return 2;
        else return 0;
    }
    else if(t(y)==3&&t(b)==2)//我方弓对方反
    {
        if (d(y)>=1&&d(y)<=4) return 0;
        if (a(y)>=a(b)) return 1;
        else if (a(y)<a(b)) return 2;
        else return 0;
    }
    else if(t(y)==2&&t(b)==3)//我方反对方弓
    {
        if (d(b)>=1&&d(b)<=4) return 0;
        if (a(y)<=a(b)) return 2;
        else if (a(y)>a(b)) return 1;
        else return 0;
    }
    else if(t(y)>=4&&t(b)==2)//我方攻击对方反
    {
        if ((aa==521||aa==522)&&bb==250) return 1;
        if (d(y)>=1&&d(y)<=4) return 0;
        if (a(y)>a(b)) return 1;
        else if (a(y)<=a(b)) return 2;
        else return 0;
    }
    else if(t(y)==2&&t(b)>=4)//我方反对方攻击
    {
        if ((bb==521||bb==522)&&aa==250) return 2;
        if (d(b)>=1&&d(b)<=4) return 0;
        if (a(y)<a(b)) return 2;
        else if (a(y)>=a(b)) return 1;
        else return 0;
    }
    else if(t(y)>=3&&t(b)==1)//我方攻击敌方防
    {
        if(a(b)==2)//对方双防
        {
            if(d(y)<=4&&d(y)>=1)return 0;//我方攻击方向不打中，平局
            else if(a(y)>2||y==420)return 1;//我方攻击伤害>2或双枪，对方死
            else return 0;
        }
        if(a(b)==8)//对方神防
                {
                    if(d(y)<=4&&d(y)>=1)return 0;//我方攻击方向不打中，平局
                    else if(a(y)>8||y==420||y==410)return 1;//我方攻击伤害>8或单、双枪，对方死
                    else return 0;
                }
        else//对方闪
        {
            if(d(y)==0)return 0;//我方打中间，平局
            else if(d(y)==d(b))return 1;//打中，对方死，下同
            else if(d(y)==5)return 1;
            else if(d(y)==10&&(d(b)==3||d(b)==4))return 1;
            else if(d(y)==11&&(d(b)==1))return 1;
            else if(d(y)==12&&(d(b)==2))return 1;
            else if(d(y)==13&&(d(b)==1||d(b)==2))return 1;
            else if(d(y)==14&&(d(b)!=2))return 1;
            else if(d(y)==15&&(d(b)!=1))return 1;
            else return 0;
        }
    }
    else if(t(b)>=3&&t(y)==1)//对方攻击我方防
    {
        if(a(y)==2)//我方双防
        {
            if(d(b)<=4&&d(b)>=1)return 0;//我方攻击方向不打中，平局
            else if(a(b)>2||b==420)return 2;//我方攻击伤害>2或双枪，对方死
            else return 0;
        }
        if(a(y)==8)//我方神防
                {
                    if(d(b)<=4&&d(b)>=1)return 0;
                    else if(a(b)>8||b==420||b==410)return 2;
                    else return 0;
                }
        else//我方闪
        {
            if(d(b)==0)return 0;//对方打中间，平局
            else if(d(b)==d(y))return 2;//打中，我方死，下同
            else if(d(b)==5)return 2;
            else if(d(b)==10&&(d(y)==3||d(y)==4))return 2;
            else if(d(b)==11&&(d(y)==1))return 2;
            else if(d(b)==12&&(d(y)==2))return 2;
            else if(d(b)==13&&(d(y)==1||d(y)==2))return 2;
            else if(d(b)==14&&(d(y)!=2))return 2;
            else if(d(b)==15&&(d(y)!=1))return 2;
            else return 0;
        }
    }
    else return 0;
}
function mov()//属于pc函数
{
    r=rnd(1,3)+101;
    return r;
}
function pc()//电脑自动
{
    if(aq==0)//我方0气
    {
        if(bq==0)return 000;
        else
        {
            r=rnd(1,3);
            if(r<3)return 000;
            else return 410;
        }
    }
    if(aq==1)//我方1气
    {
        if(bq==0)
        {
            r=rnd(1,5);
            if(r<=3)return mov();
            else if(r==4)return 000;
            else return 100;
        }
        else if(bq==1)
        {
            r=rnd(1,10);
            if(r<3)return 000;
            else if(r<4) return mov();
            else if(r<6) return 410;
            else if(r==7)return 210;
            else if(r==8)return 310;
            else return 100;
        }
        else
        {
            r=rnd(1,6);
            if(r==1)return 000;
            else if(r==2) return 521;
            else if(r==3) return 522;
            else if(r==4) return 520;
            else if(r==5) return 420;
            else return 100;
        }

    }
    else if(aq>=2)//我方>=2气
    {

        if(bq==0)
        {
            r=rnd(1,4);
            if(r<3)return 000;
            else if(r==4) return 100;
            else return mov();
        }
        else if(bq==1)
        {
            r=rnd(1,9);
            if(r<3)return 000;
            else if(r<4) return mov();
            else if(r<6) return 410;
            else if(r==7)return 210;
            else return 100;
        }
        else if(bq==2)
        {
            r=rnd(1,9);
            if(r<3)return 000;
            else if(r==3) return 410;
            else if(r==4)return 420;
            else if(r==5) return 520;
            else if(r==6)return 521;
            else if(r==7)return 522;
            else if(r==8)return mov();
            else return 100;
        }
        else if(bq==3)
        {
            rnd(1,9);
            if(r<3)return 000;
            else if(r==3) return 630;
            else if(r==4)return 420;
            else if(r==5) return 520;
            else if(r==6)return 521;
            else if(r==7)return 522;
            else if(r==8)return mov();
            else return 100;
        }
        else if(bq>=4)
        {
            r=rnd(1,7);
            if(r<3)return 641;
            else if(r<5)return 642;
            else if(r<7)return 630;
            else return 420;
        }
    }

}

function colorit(it)
{
		if(aq>=5)
		{
			bt655.className = "btn btn-primary";
			bt641.className = "btn btn-primary";
			bt642.className = "btn btn-primary";
			bt630.className = "btn btn-primary";
			bt230.className = "btn btn-primary";
			bt330.className = "btn btn-primary";
			bt535.className = "btn btn-primary";
			bt420.className = "btn btn-primary";
			bt520.className = "btn btn-primary";
			bt521.className = "btn btn-primary";
			bt522.className = "btn btn-primary";
			bt220.className = "btn btn-primary";
			bt320.className = "btn btn-primary";
			bt410.className = "btn btn-primary";
			bt411.className = "btn btn-primary";
			bt412.className = "btn btn-primary";
			bt413.className = "btn btn-primary";
			bt414.className = "btn btn-primary";
			bt210.className = "btn btn-primary";
			bt310.className = "btn btn-primary";
			bt180.className = "btn btn-primary";
			bt000.className = "btn btn-primary";
			bt100.className = "btn btn-primary";
			bt101.className = "btn btn-primary";
			bt102.className = "btn btn-primary";
			bt103.className = "btn btn-primary";
			bt104.className = "btn btn-primary";
			bt250.className = "btn btn-primary";
		}
	else if(aq==4)
		{
			bt655.className = "btn btn-dark";
			bt641.className = "btn btn-primary";
			bt642.className = "btn btn-primary";
			bt630.className = "btn btn-primary";
			bt230.className = "btn btn-primary";
			bt330.className = "btn btn-primary";
			bt535.className = "btn btn-primary";
			bt420.className = "btn btn-primary";
			bt520.className = "btn btn-primary";
			bt521.className = "btn btn-primary";
			bt522.className = "btn btn-primary";
			bt220.className = "btn btn-primary";
			bt320.className = "btn btn-primary";
			bt410.className = "btn btn-primary";
			bt411.className = "btn btn-primary";
			bt412.className = "btn btn-primary";
			bt413.className = "btn btn-primary";
			bt414.className = "btn btn-primary";
			bt210.className = "btn btn-primary";
			bt310.className = "btn btn-primary";
			bt180.className = "btn btn-primary";
			bt000.className = "btn btn-primary";
			bt100.className = "btn btn-primary";
			bt101.className = "btn btn-primary";
			bt102.className = "btn btn-primary";
			bt103.className = "btn btn-primary";
			bt104.className = "btn btn-primary";
			bt250.className = "btn btn-primary";
		}
	else if(aq==3)
		{
			bt655.className = "btn btn-dark";
			bt641.className = "btn btn-dark";
			bt642.className = "btn btn-dark";
			bt630.className = "btn btn-primary";
			bt230.className = "btn btn-primary";
			bt330.className = "btn btn-primary";
			bt535.className = "btn btn-primary";
			bt420.className = "btn btn-primary";
			bt520.className = "btn btn-primary";
			bt521.className = "btn btn-primary";
			bt522.className = "btn btn-primary";
			bt220.className = "btn btn-primary";
			bt320.className = "btn btn-primary";
			bt410.className = "btn btn-primary";
			bt411.className = "btn btn-primary";
			bt412.className = "btn btn-primary";
			bt413.className = "btn btn-primary";
			bt414.className = "btn btn-primary";
			bt210.className = "btn btn-primary";
			bt310.className = "btn btn-primary";
			bt180.className = "btn btn-primary";
			bt000.className = "btn btn-primary";
			bt100.className = "btn btn-primary";
			bt101.className = "btn btn-primary";
			bt102.className = "btn btn-primary";
			bt103.className = "btn btn-primary";
			bt104.className = "btn btn-primary";
			bt250.className = "btn btn-primary";
		}
	else if(aq==2)
		{
			bt655.className = "btn btn-dark";
			bt641.className = "btn btn-dark";
			bt642.className = "btn btn-dark";
			bt630.className = "btn btn-dark";
			bt230.className = "btn btn-dark";
			bt330.className = "btn btn-dark";
			bt535.className = "btn btn-dark";
			bt420.className = "btn btn-primary";
			bt520.className = "btn btn-primary";
			bt521.className = "btn btn-primary";
			bt522.className = "btn btn-primary";
			bt220.className = "btn btn-primary";
			bt320.className = "btn btn-primary";
			bt410.className = "btn btn-primary";
			bt411.className = "btn btn-primary";
			bt412.className = "btn btn-primary";
			bt413.className = "btn btn-primary";
			bt414.className = "btn btn-primary";
			bt210.className = "btn btn-primary";
			bt310.className = "btn btn-primary";
			bt180.className = "btn btn-primary";
			bt000.className = "btn btn-primary";
			bt100.className = "btn btn-primary";
			bt101.className = "btn btn-primary";
			bt102.className = "btn btn-primary";
			bt103.className = "btn btn-primary";
			bt104.className = "btn btn-primary";
			bt250.className = "btn btn-primary";
		}
	else if(aq==1)
		{
			bt655.className = "btn btn-dark";
			bt641.className = "btn btn-dark";
			bt642.className = "btn btn-dark";
			bt630.className = "btn btn-dark";
			bt230.className = "btn btn-dark";
			bt330.className = "btn btn-dark";
			bt535.className = "btn btn-dark";
			bt420.className = "btn btn-dark";
			bt520.className = "btn btn-dark";
			bt521.className = "btn btn-dark";
			bt522.className = "btn btn-dark";
			bt220.className = "btn btn-dark";
			bt320.className = "btn btn-dark";
			bt410.className = "btn btn-primary";
			bt411.className = "btn btn-primary";
			bt412.className = "btn btn-primary";
			bt413.className = "btn btn-primary";
			bt414.className = "btn btn-primary";
			bt210.className = "btn btn-primary";
			bt310.className = "btn btn-primary";
			bt180.className = "btn btn-primary";
			bt000.className = "btn btn-primary";
			bt100.className = "btn btn-primary";
			bt101.className = "btn btn-primary";
			bt102.className = "btn btn-primary";
			bt103.className = "btn btn-primary";
			bt104.className = "btn btn-primary";
			bt250.className = "btn btn-primary";
		}
	else
	
	{
			bt655.className = "btn btn-dark";
			bt641.className = "btn btn-dark";
			bt642.className = "btn btn-dark";
			bt630.className = "btn btn-dark";
			bt230.className = "btn btn-dark";
			bt330.className = "btn btn-dark";
			bt535.className = "btn btn-dark";
			bt420.className = "btn btn-dark";
			bt520.className = "btn btn-dark";
			bt521.className = "btn btn-dark";
			bt522.className = "btn btn-dark";
			bt220.className = "btn btn-dark";
			bt320.className = "btn btn-dark";
			bt410.className = "btn btn-dark";
			bt411.className = "btn btn-dark";
			bt412.className = "btn btn-dark";
			bt413.className = "btn btn-dark";
			bt414.className = "btn btn-dark";
			bt210.className = "btn btn-dark";
			bt310.className = "btn btn-dark";
			bt180.className = "btn btn-dark";
			bt000.className = "btn btn-primary";
			bt100.className = "btn btn-primary";
			bt101.className = "btn btn-primary";
			bt102.className = "btn btn-primary";
			bt103.className = "btn btn-primary";
			bt104.className = "btn btn-primary";
			bt250.className = "btn btn-primary";
	}
	
	if(it==000)bt000.className = "btn btn-success";
	else if(it==100)bt100.className = "btn btn-success";
	else if(it==101)bt101.className = "btn btn-success";
	else if(it==102)bt102.className = "btn btn-success";
	else if(it==103)bt103.className = "btn btn-success";
	else if(it==104)bt104.className = "btn btn-success";
	else if(it==210)bt210.className = "btn btn-success";
	else if(it==220)bt220.className = "btn btn-success";
	else if(it==230)bt230.className = "btn btn-success";
	else if(it==310)bt310.className = "btn btn-success";
	else if(it==320)bt320.className = "btn btn-success";
	else if(it==330)bt330.className = "btn btn-success";
	else if(it==410)bt410.className = "btn btn-success";
	else if(it==420)bt420.className = "btn btn-success";
	else if(it==411)bt411.className = "btn btn-success";
	else if(it==412)bt412.className = "btn btn-success";
	else if(it==413)bt413.className = "btn btn-success";
	else if(it==414)bt414.className = "btn btn-success";
	else if(it==520)bt520.className = "btn btn-success";
	else if(it==521)bt521.className = "btn btn-success";
	else if(it==522)bt522.className = "btn btn-success";
	else if(it==535)bt535.className = "btn btn-success";
	else if(it==630)bt630.className = "btn btn-success";
	else if(it==641)bt641.className = "btn btn-success";
	else if(it==642)bt642.className = "btn btn-success";
	else if(it==655)bt655.className = "btn btn-success";
	else if(it==180)bt180.className = "btn btn-success";
	else if(it==250)bt250.className = "btn btn-success";
}
colorit(0);
function ok()
{
	if(over==1)return;
    ++rd;
	document.getElementById("rd").innerHTML = "回合" + rd;
    bb=pc();
    switch(bb)
    {
        case 000:document.getElementById("bb").innerHTML = "气";break;
        case 100:document.getElementById("bb").innerHTML = "防";break;
        case 101:document.getElementById("bb").innerHTML = "上";break;
        case 102:document.getElementById("bb").innerHTML = "下";break;
        case 103:document.getElementById("bb").innerHTML = "左";break;
        case 104:document.getElementById("bb").innerHTML = "右";break;
        case 210:document.getElementById("bb").innerHTML = "反";break;
        case 220:document.getElementById("bb").innerHTML = "二反";break;
        case 230:document.getElementById("bb").innerHTML = "三反";break;
        case 310:document.getElementById("bb").innerHTML = "弓";break;
        case 320:document.getElementById("bb").innerHTML = "二弓";break;
        case 330:document.getElementById("bb").innerHTML = "三弓";break;
        case 410:document.getElementById("bb").innerHTML = "枪";break;
        case 420:document.getElementById("bb").innerHTML = "双枪";break;
        case 411:document.getElementById("bb").innerHTML = "上枪";break;
        case 412:document.getElementById("bb").innerHTML = "下枪";break;
        case 413:document.getElementById("bb").innerHTML = "左枪";break;
        case 414:document.getElementById("bb").innerHTML = "右枪";break;
        case 520:document.getElementById("bb").innerHTML = "横切";break;
        case 521:document.getElementById("bb").innerHTML = "上切";break;
        case 522:document.getElementById("bb").innerHTML = "下切";break;
        case 535:document.getElementById("bb").innerHTML = "圆切";break;
        case 630:document.getElementById("bb").innerHTML = "光";break;
        case 641:document.getElementById("bb").innerHTML = "闪电";break;
        case 642:document.getElementById("bb").innerHTML = "地震";break;
        case 655:document.getElementById("bb").innerHTML = "毁灭";break;
        case 180:document.getElementById("bb").innerHTML = "神防";break;
        case 150:document.getElementById("bb").innerHTML = "神反";break;
        default:document.getElementById("bb").innerHTML = "？";break;
    }
    dead=pan(aa,bb);
    document.getElementById("aq").innerHTML = aq;
    document.getElementById("bq").innerHTML = bq;
	//color
	colorit(aa);

	
    if(dead==0){//QMessageBox::about(this, "平局！", "平局！");
            }
            else if(dead==1){document.getElementById("ask").innerHTML = "你胜利了！";
            awin++;
            }
            else if(dead==2){document.getElementById("ask").innerHTML = "你失败了！";
            bwin++;
            }
            else if(dead==3){document.getElementById("ask").innerHTML = "平局！";
            }
            else if(dead==7){document.getElementById("ask").innerHTML = "双方都爆气了！";
            }
            else if(dead==8){document.getElementById("ask").innerHTML = "你爆气了！";
            bwin++;
            }
            else if(dead==9){document.getElementById("ask").innerHTML = "对方爆气了！";
            awin++;
            }
    if(dead>0)
    {


		winr++;
		//document.getElementById("gm").innerHTML = "游戏" + winr;
		document.getElementById("aw").innerHTML = awin;
		document.getElementById("bw").innerHTML = bwin;
		document.getElementById("sl").innerHTML = "胜率" + Math.round(100*awin/(awin+bwin)) + "%";
		//document.getElementById("ok").innerHTML = "";
		
		over=1;
    }
	
}

function c000()
{if(over==1)return;
    aa=000;
    document.getElementById("aa").innerHTML = "气";colorit(000);
}

function c100()
{if(over==1)return;
    aa=100;
    document.getElementById("aa").innerHTML = "防";colorit(100);
}

function c101()
{if(over==1)return;
    aa=101;
    document.getElementById("aa").innerHTML = "上";colorit(101);
}

function c102()
{if(over==1)return;
    aa=102;
    document.getElementById("aa").innerHTML = "下";colorit(102);
}

function c103()
{if(over==1)return;
    aa=103;
    document.getElementById("aa").innerHTML = "左";colorit(103);
}

function c104()
{if(over==1)return;
    aa=104;
    document.getElementById("aa").innerHTML = "右";colorit(104);
}

function c410()
{if(over==1)return;
    aa=410;
    document.getElementById("aa").innerHTML = "枪";colorit(410);
}

function c420()
{if(over==1)return;
    aa=420;
    document.getElementById("aa").innerHTML = "双枪";colorit(420);
}

function c411()
{if(over==1)return;
    aa=411;
    document.getElementById("aa").innerHTML = "上枪";colorit(411);
}

function c412()
{if(over==1)return;
    aa=412;
    document.getElementById("aa").innerHTML = "下枪";colorit(412);
}

function c413()
{if(over==1)return;
    aa=413;
    document.getElementById("aa").innerHTML = "左枪";colorit(413);
}

function c414()
{if(over==1)return;
    aa=414;
    document.getElementById("aa").innerHTML = "右枪";colorit(414);
}

function c520()
{if(over==1)return;
    aa=520;
    document.getElementById("aa").innerHTML = "横切";colorit(520);
}

function c521()
{if(over==1)return;
    aa=521;
    document.getElementById("aa").innerHTML = "上切";colorit(521);
}

function c522()
{if(over==1)return;
    aa=522;
    document.getElementById("aa").innerHTML = "下切";colorit(522);
}

function c535()
{if(over==1)return;
    aa=535;
    document.getElementById("aa").innerHTML = "圆切";colorit(535);
}

function c630()
{if(over==1)return;
    aa=630;
    document.getElementById("aa").innerHTML = "光";colorit(630);
}

function c641()
{if(over==1)return;
    aa=641;
    document.getElementById("aa").innerHTML = "闪电";colorit(641);
}

function c642()
{if(over==1)return;
    aa=642;
    document.getElementById("aa").innerHTML = "地震";colorit(642);
}
function c655()
{if(over==1)return;
    aa=655;
    document.getElementById("aa").innerHTML = "毁灭";colorit(655);
}

function c210()
{if(over==1)return;
    aa=210;
    document.getElementById("aa").innerHTML = "反";colorit(210);
}

function c220()
{if(over==1)return;
    aa=220;
    document.getElementById("aa").innerHTML = "二反";colorit(220);
}

function c230()
{if(over==1)return;
    aa=230;
    document.getElementById("aa").innerHTML = "三反";colorit(230);
}

function c310()
{if(over==1)return;
    aa=310;
    document.getElementById("aa").innerHTML = "弓";colorit(310);
}

function c320()
{if(over==1)return;
    aa=320;
    document.getElementById("aa").innerHTML = "二弓";colorit(320);
}

function c330()
{if(over==1)return;
    aa=330;
    document.getElementById("aa").innerHTML = "三弓";colorit(330);
}
function c180()
{if(over==1)return;
    aa=180;
    document.getElementById("aa").innerHTML = "神防";colorit(180);
}

function c250()
{if(over==1)return;
    aa=250;
    document.getElementById("aa").innerHTML = "神反";colorit(250);
}
function g1()
{
document.getElementById("gm").innerHTML = "游戏" + winr;

        document.getElementById("ask").innerHTML = "游戏重新开始"
        aq=00;bq=00;rd=1;aa=000;r=0;dead=0;
        //awin=0;bwin=0;winpa=100;winr=0;
		document.getElementById("rd").innerHTML = "回合" + rd;
		document.getElementById("aq").innerHTML = "0";
		document.getElementById("bq").innerHTML = "0";
		document.getElementById("aa").innerHTML = "气";
		document.getElementById("bb").innerHTML = "气";
    over=0;colorit(aa);

}
