var Host = "http://base.hope55.com/";
var API = Host + "API/WebAPI/";
var BasePageSize = 9; //默认分页数
var DefualtDepartmentID = 158; //默认部门ID
var DefualtOrganID = 30; //默认企业ID
jQuery.support.cors = true; //ie8手动开启cors
$.ajaxSetup({
	cache: true
});
String.prototype.myReplace = function(f, e) { //把f替换成e
	var reg = new RegExp(f, "g"); //创建正则RegExp对象
	return this.replace(reg, e);
}
//时间函数
String.prototype.GetNewDate = function(style, char) {
	if(Curren.isEmpty(char) && Curren.isEmpty(style)) return this.substr(0, 10);
	var year = this.substr(0, 4);
	var month = this.substr(5, 2);
	var day = this.substr(8, 2);
	var date = Curren.isEmpty(char) ? this.substr(0, 10) : year + char + month + char + day;
	if(!Curren.isEmpty(style)) {
		if(style == 6) {
			date = date.substr(0, 7);
		} else if(style == 2) {
			date = date.substr(8, 2);
		}else if (style == 'month'){
		    month = month[0]=="0"?month.substr(1,1):month;
		    date =month;
        }
	}
	return date;
}
//数据模型
var Model = {
	//部门
	Department: {
		Name: "{Name}",
		Address: "{Address}",
		Phone: "{Phone}",
		Logo: "{Logo}",
		Email: "{Email}",
		Fax: "{Fax}",
		ZipCode: "{ZipCode}",
		Alias: "{Alias}"
	},
	//导航栏
	Nav: {
		FID: "{FID}",
		ID: "{ID}",
		Logo: "{Logo}",
		Name: "{Name}",
		Type: "{Type}",
		Url: "{Url}"
	},
	//栏目
	Column: {
		Aliase: "{Aliase}",
		Logo: "{Logo}",
		Name: "{Name}",
		Fid: "{Fid}",
		Describe: "{Describe}",
		ID:"{ID}",
		Type:"{Type}",
		Url:"{Url}"

	},
	//部门集合
	Departments: {
		ID: "{ID}",
		Name: "{Name}",
		Alias: "{Alias}"
	},
	//单页信息
	SinglePage: {
		ColumnID: "{ColumnID}",
		CreateTime: "{CreateTime}",
		Describe: "{Describe}",
		ID: "{ID}",
		Info: "{Info}",
		Photo: "{Photo}",
		Press: "{Press}"
	},
	//列表信息集合
	NewsInfos: {
		ID: "{ID}",
		Title: "{Title}",
		Author: "{Author}",
		Source: "{Source}",
		ShowTime: "{ShowTime}",
		ShowTime2: "{ShowTime2}",
		ShowTime6: "{ShowTime6}",
		ShowTime6_2: "ShowTime6_2",
        ShowTimeMonth:"ShowTimeMonth",
		Cover: "{Cover}",
		Describe: "{Describe}",
		HasPhoto: "{HasPhoto}",
		Hot: "{Hot}",
		KeyWord: "{KeyWord}",
		Top: "{Top}",
		Url: "{Url}",
		FID: "{FID}"
	},
	//列表信息
	NewsInfo: {
		Author: "{Author}",
		Details: "{Details}",
		Fid: "{Fid}",
		KeyWord: "{KeyWord}",
		Press: "{Press}",
		ShowTime: "{ShowTime}",
		Source: "{Source}",
		Title: "{Title}",
		Url: "{Url}"
	},
	//文件信息集合
	FilesInfo: {
		Title: "{Title}",
		Top: "{Top}",
		Url: "{Url}",
		ShowTime: "{ShowTime}",
		ShowTime2: "{ShowTime2}",
		ShowTime6: "{ShowTime6}",
		ShowTime6_2: "ShowTime6_2",
        ShowTimeMonth:"ShowTimeMonth",
        Hot: "{Hot}",
		FileUrl: "{FileUrl}",
		Describe: "{Describe}"
	},
	//企业信息
	OrganInfo: {
		Address: "{Address}",
		Alias: "{Alias}",
		CreateTime: "{CreateTime}",
		ID: "{ID}",
		LOGO: "{LOGO}",
		Name: "{Name}",
		Record: "{Record}",
		State: "{State}",
		Tel: "{Tel}"
	},
	//副导航
	Vice_nav: {
		Nav: {
			Name: "{Name}",
			ID: "{ID}",
			Type: "{Type}",
			Url: "{Url}",
			Aliase: "{Aliase}",
			Logo: "{Logo}",
			Describe: "{Describe}",
			ClassOn: "{ClassOn}"
		},
		Parent: {
			Name: "{P_Name}",
			ID: "{P_ID}",
			Type: "{P_Type}",
			Url: "{P_Url}",
			Aliase: "{P_Aliase}",
			Logo: "{P_Logo}",
			Describe: "{P_Describe}"
		}
	}

};

//通用函数
var Curren = {
	//时间截取
	formatDatebox: function(value, char, style) {
		var year = value.substr(0, 4);
		var month = value.substr(5, 2);
		var day = value.substr(8, 2);
		var date = Curren.isEmpty(char) ? value.substr(0, 10) : year + char + month + char + day;
		if(!Curren.isEmpty(style)) {
			if(style == 6) {
				date = date.substr(0, 7);
			} else if(style == 2) {
				date = date.substr(8, 2);
			}
		}
		return date;
	},
	//判断字符是否为空的方法
	isEmpty: function(obj) {
		if(typeof obj == "undefined" || obj == null || obj == "") {
			return true;
		} else {
			return false;
		}
	},
	getQueryString: function(name) {
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
		var r = window.location.search.substr(1).match(reg);

		// if (!r){
		//      if( !Curren.getQueryString("Nid")){
		//
		//      };
		// }
		if(r != null) {
			return decodeURI(r[2]);
		}
		return null;
	},
	SetClassStyle: function(mark) {
		mark = mark||'>'
		var CId = Curren.getQueryString("CId");
		if(Curren.isEmpty(CId)) {
			var NId = Curren.getQueryString("NId");
			var Info = Base.GetNewsInfoByNid(NId);
			$("[name='" + Info.Fid + "']").addClass("on");
		} else {
			var parentCid=$("[name='" + CId + "']").attr('data-parent-id');
			$("[name='" + CId + "']").addClass("on");//给当前栏目添加选中
			$("[name='" + parentCid + "']").addClass("on");//给当前栏目的父栏目添加选中

			var lanmu = Base.GetColumnByid(CId);
            if(Curren.isEmpty(lanmu.Url)) {
                lanmu.Url = "./list.html?HType=" +lanmu.Type + "&CId=" + lanmu.ID;
                if(lanmu.Type == 0) {
                    lanmu.Url = "javascript:;";
                }
            }
			if(lanmu.Fid > 0) {
				var PColumn = Base.GetColumnByid(lanmu.Fid);
                if(Curren.isEmpty(PColumn.Url)) {
                    PColumn.Url = "./list.html?HType=" +PColumn.Type + "&CId=" + PColumn.ID;
                    if(PColumn.Type == 0) {
                        PColumn.Url = "javascript:;";
                    }
                }
                $("[name='Pnav']").html('当前位置：<a href="./">首页</a> '+mark+' <a href="'+PColumn.Url+'">'+PColumn.Name+'</a> '+mark+' <a href="'+lanmu.Url+'">'+lanmu.Name+'</a>');

                $("[name='Fnav']").html(lanmu.Name);
			} else {
                $("[name='Pnav']").html('当前位置：<a href="./">首页</a> '+mark+' <a href="'+lanmu.Url+'">'+lanmu.Name+'</a>');
                $("[name='Fnav']").html(lanmu.Name);
			}

		}
	},
	GetPageBar: function(total, pageSize, url) {
		if (typeof  total!="number"){
			 total=total.Total
		}
		if(total <= pageSize) {
			return;
		}
		var pageIndex = Curren.getQueryString("PageIndex");
		var url = url + "&PageIndex=";
		if(Curren.isEmpty(pageIndex) || pageIndex <= 1) pageIndex = 1;
		if(Curren.isEmpty(pageSize)) pageSize = BasePageSize;

		var maxPI = (total / pageSize <= 1 ? 1 : Math.ceil(total / pageSize));
		if(pageIndex >= maxPI) pageIndex = maxPI;
		var lastPage = url + (pageIndex - 1 <= 1 ? 1 : pageIndex - 1);
		var nextPage = url + (parseInt(pageIndex) + 1 > maxPI ? maxPI : parseInt(pageIndex) + 1);
		var strPageHtml = "<a href='" + lastPage + "' class='pageLeft "+(pageIndex == 1?'unPage':'')+"' ></a>";
		if(maxPI <= 3) {
			for(var i = 1; i <= maxPI; i++) {
				var csson = (i == pageIndex ? "class='on number'" : "");
				strPageHtml += "<a href='" + url + i + "' " + csson + " class='number'>" + (i<10?"0"+i:i) + "</a>";
			}
		} else {
			if(pageIndex == 1) {
				strPageHtml += "<a href='" + url + 1 + "' class='on number'>01</a>";
				strPageHtml += "<a href='" + url + (pageIndex + 1) + "' class='number' >" + (pageIndex + 1) + "</a>";
				strPageHtml += "<a href='" + url + (pageIndex + 2) + "' class='number' >" + (pageIndex + 2) + "</a>";
				strPageHtml += "...<a href='" + url + maxPI + "' class='number'>" + (maxPI<10?'0'+maxPI:maxPI) + "</a>";

			} else if(pageIndex == maxPI) {
				strPageHtml += "<a href='" + url + 1 + "' class='number' >01</a>...";
				strPageHtml += "<a href='" + url + (pageIndex - 2) + "' class='number' >" +((pageIndex - 2)<10?'0'+(pageIndex - 2):(pageIndex - 2))+ "</a>";
				strPageHtml += "<a href='" + url + (pageIndex - 1) + "' class='number'>" + ((pageIndex - 1)<10?'0'+(pageIndex - 1):(pageIndex - 1) )+ "</a>";
				strPageHtml += "<a href='" + url + maxPI + "' class='on number'>" +  (maxPI<10?'0'+maxPI:maxPI) + "</a>";
			} else {
				for(var i = pageIndex - 2; i <= pageIndex; i++) {
					var csson = ((i + 1) == pageIndex ? "class='on number'" : "");

					strPageHtml += "<a href='" + url + (i + 1) + "' " + csson + " class='number'>" + ((i + 1)<10?'0'+(i + 1):(i+1)) + "</a>";

				}
				if (pageIndex!=maxPI-1){
					strPageHtml += "...<a href='" + url + maxPI + "' class='number'>" + (maxPI<10?'0'+maxPI:maxPI) + "</a>";
				}
			}
		}
		if (pageIndex==maxPI){
			strPageHtml += "<a href='javascript:;' class='pageRight unPage' ></a>";
		}else{
			strPageHtml += "<a href='" + nextPage + "' class='pageRight' ></a>";
		}

		$("#page_turn_box").html(strPageHtml);
	}
}

//数据接口
var Base = {
	//获取导航栏栏目
	GetNavColumnsByDid: function(strHtml, Did, IDname) {
		if(Curren.isEmpty(Did)) Did = DefualtDepartmentID;
		if(Curren.isEmpty(IDname)) IDname = Did;
		var NewHtml = "";
		var GetData;
		$.ajax({
			type: "GET",
			url: API + "GetNavColumnsByDid?Did=" + Did,
			async: false,
			dataType: "json",
			success: function(data) {
				GetData = JSON.parse(data);
				if(!GetData)GetData=[];
				var len = GetData.length;
				if(len > 0) {
					for(var i = 0; i < len; i++) {
						var ColumnUrl = "";
						if(Curren.isEmpty(GetData[i].Url)) {
							GetData[i].Url = "list.html?HType=" + GetData[i].Type + "&CId=" + GetData[i].ID;
							if(GetData[i].Type == 0) {
								GetData[i].Url = "javascript:;";
							}
						} else {

						}
						// NewHtml += strHtml
						//     .myReplace(Model.Nav.ID, GetData[i].ID)
						//     .myReplace(Model.Nav.Logo, Host + GetData[i].Logo)
						//     .myReplace(Model.Nav.Name, GetData[i].Name)
						//     .myReplace(Model.Nav.Url, ColumnUrl)
						//     .myReplace(Model.Nav.FID, GetData[i].FID)
						// ;
					}
					// $("#" + IDname + "").append(NewHtml);
				}
			}
		});
		return GetData;
	},
	//获得指定栏目信息
	GetColumnByid: function(Cid) {
		var lanmu=Model.Column;
		$.ajax({
			type: "GET",
			url: API + "GetColumnByid?Cid=" + Cid,
			async: false,
			dataType: "json",
			success: function(data) {
				lanmu = JSON.parse(data);

			}
		})
		return lanmu;
	},
	//获得指定部门信息
	GetDepartmentByDid: function(Did) {
		if(Curren.isEmpty(Did)) Did = DefualtDepartmentID;
		var bumen=Model.Department;
		$.ajax({
			type: "GET",
			url: API + "GetDepartmentByDid?Did=" + Did,
			async: false,
			dataType: "json",
			success: function(data) {
				bumen = JSON.parse(data);

			}
		})
		return bumen;

	},
	//根据企业获取全部部门
	GetDepartmentsByOid: function(strHtml, Oid, IDName) {
		if(Curren.isEmpty(Oid)) Oid = DefualtOrganID;
		if(Curren.isEmpty(IDName)) IDName = Oid;

		var NewHtml = "";
		$.ajax({
			type: "GET",
			url: API + "GetDepartmentsByOid?Oid=" + Oid,
			async: false,
			dataType: "json",
			success: function(data) {
				var GetData = JSON.parse(data);
				var len = GetData.length;
				if(len > 0) {
					for(var i = 0; i < len; i++) {
						NewHtml += strHtml
							.myReplace(Model.Departments.ID, GetData[i].ID)
							.myReplace(Model.Departments.Name,  GetData[i].Name)
							.myReplace(Model.Departments.Alias, GetData[i].Alias);
					}
					$("#" + IDName + "").append(NewHtml);
				}
			}
		})
	},
	//获取单页信息
	GetSinglePageInfoByCid: function(strHtml,Cid,IDname) {
		var NewHtml = "";
		var danye=Model.SinglePage;
		if(Curren.isEmpty(IDname)) IDname = Cid;
		$.ajax({
			type: "GET",
			url: API + "GetSinglePageInfoByCid?Cid=" + Cid,
			async: false,
			dataType: "json",
			success: function(data) {
				danye = JSON.parse(data);
				danye.ID = "list.html?HType=1&CId=" +danye.ColumnID;
				if (strHtml){
					NewHtml += strHtml.myReplace(Model.SinglePage.Photo,danye.Photo)
						.myReplace(Model.SinglePage.Describe,danye.Describe)
						.myReplace(Model.SinglePage.ID,danye.ID);
					$("#" + IDname + "").append(NewHtml);
				}
			},
			error:function () {
				danye.Info="暂无数据"
			}
		})
		return danye;
	},
	//获取列表信息集合
	GetNewsInfoByCid: function(strHtml, Cid, IDname, needPhoto, CssClass, PageIndex, SearchWord, PageSize, DefaultImg,descNum) {
		var Total = 0;
		var GetData=[];
		var NewHtml = "";
		if(Curren.isEmpty(PageIndex)) PageIndex = 1;
		if(Curren.isEmpty(PageSize)) PageSize = BasePageSize;
		if(Curren.isEmpty(SearchWord)) SearchWord = "";
		if(Curren.isEmpty(IDname)) IDname = Cid;
		if(Curren.isEmpty(descNum)) descNum = 150;
		if(!Curren.isEmpty(CssClass)) $("#" + IDname + "").attr("class", CssClass);
		if(!needPhoto) {
			needPhoto = false;
		}
		var Senddata = {
			PageIndex: PageIndex,
			Cid: Cid,
			PageSize: PageSize,
			SearchWord: SearchWord,
			NeedPhoto: needPhoto,
			descNum:descNum
		}
		$.ajax({
			type: "GET",
			url: API + "GetNewsInfoByCid",
			async: false,
			data: Senddata,
			dataType: "json",
			success: function(data) {
				GetData = JSON.parse(data).row;
				Total = JSON.parse(data).total;
				var len = GetData.length;
				if(len > 0) {
					for(var i = 0; i < len; i++) {
						NewHtml += strHtml
							.myReplace(Model.NewsInfos.ID, GetData[i].ID)
							.myReplace(Model.NewsInfos.Cover, Curren.isEmpty(GetData[i].Cover) ? DefaultImg : GetData[i].Cover)
							.myReplace(Model.NewsInfos.Author, GetData[i].Author)
							.myReplace(Model.NewsInfos.Describe, GetData[i].Describe)
							.myReplace(Model.NewsInfos.HasPhoto, GetData[i].HasPhoto)
							.myReplace(Model.NewsInfos.Hot, GetData[i].Hot)
							.myReplace(Model.NewsInfos.KeyWord, GetData[i].KeyWord)
							.myReplace(Model.NewsInfos.ShowTime, GetData[i].ShowTime.GetNewDate())
							.myReplace(Model.NewsInfos.Source, Curren.isEmpty(GetData[i].Source) ? "本站" : GetData[i].Source)
							.myReplace(Model.NewsInfos.Title, GetData[i].Title)
							.myReplace(Model.NewsInfos.Top, GetData[i].Top)
							.myReplace(Model.NewsInfos.Url, (Curren.isEmpty(GetData[i].Url) ? "list.html?HType=2&CId=" + GetData[i].FID + "&NId=" + GetData[i].ID : GetData[i].Url))
							.myReplace(Model.NewsInfos.ShowTime2, GetData[i].ShowTime.GetNewDate(2))
							.myReplace(Model.NewsInfos.ShowTime6, GetData[i].ShowTime.GetNewDate(6))
                            .myReplace(Model.NewsInfos.ShowTime6_2, GetData[i].ShowTime.GetNewDate(6, '-'))
                            .myReplace(Model.NewsInfos.ShowTimeMonth, GetData[i].ShowTime.GetNewDate("month"));
					}
					Curren.GetPageBar(Total, PageSize, "list.html?HType=2&CId=" + Cid + "");
					$("#" + IDname + "").append(NewHtml);
				}
			}
		})
		return {"Total":Total,"GetData":GetData};
	},
	//获取列表信息详情
	GetNewsInfoByNid: function(Nid) {
		$.ajax({
			type: "GET",
			url: API + "GetNewsInfoByNid?Nid=" + Nid,
			async: false,
			dataType: "json",
			success: function(data) {
				Model.NewsInfo = JSON.parse(data);
				Model.NewsInfo.ShowTime = Curren.formatDatebox(Model.NewsInfo.ShowTime);
				var reg=new RegExp("&gt;","g");
				var reg1=new RegExp("&lt;","g");
				var reg2=new RegExp("&amp;","g");
				Model.NewsInfo.Details=Model.NewsInfo.Details.replace(reg,">").replace(reg1,"<").replace(reg2,"&");
				if(Curren.isEmpty(Model.NewsInfo.Source)) Model.NewsInfo.Source = "本站";
			}
		})
		return Model.NewsInfo;
	},
	//获取文件信息集合
	GetFilesInfoByCid: function(strHtml, Cid, IDname, CssClass, PageIndex, SearchWord, PageSize,isAll) {
		PageIndex = PageIndex || 1 ;
		PageSize = PageSize||BasePageSize ;
		isAll = isAll || false;
		var Total = 0;
		var NewHtml = "";
		var GetData="";
		if(Curren.isEmpty(SearchWord)) SearchWord = "";
		if(Curren.isEmpty(IDname)) IDname = Cid;
		if(!Curren.isEmpty(CssClass)) $("#" + IDname + "").attr("class", CssClass);
		var Senddata = {
			PageIndex: PageIndex,
			Cid: Cid,
			PageSize: PageSize,
			SearchWord: SearchWord,
			isAll: isAll
		}
		$.ajax({
			type: "GET",
			url: API + "GetFilesInfoByCid",
			async: false,
			data: Senddata,
			dataType: "json",
			success: function(data) {
				GetData = JSON.parse(data).row;
				Total = JSON.parse(data).total;
				var len = GetData.length;
				if(len > 0) {
					for(var i = 0; i < len; i++) {
						GetData[i].Describe=GetData[i].Describe!=null? GetData[i].Describe:'暂无数据';
						NewHtml += strHtml
							.myReplace(Model.FilesInfo.FileUrl, GetData[i].FileUrl)
							.myReplace(Model.FilesInfo.Describe, GetData[i].Describe)
							.myReplace(Model.FilesInfo.Hot, GetData[i].Hot)
							.myReplace(Model.FilesInfo.ShowTime, GetData[i].ShowTime.GetNewDate())
							.myReplace(Model.FilesInfo.Title, GetData[i].Title)
							.myReplace(Model.FilesInfo.Top, GetData[i].Top)
							.myReplace(Model.FilesInfo.Url, (Curren.isEmpty(GetData[i].Url) ? "javascript:;" : GetData[i].Url))
							.myReplace(Model.FilesInfo.ShowTime2, GetData[i].ShowTime.GetNewDate(2))
							.myReplace(Model.FilesInfo.ShowTime6, GetData[i].ShowTime.GetNewDate(6))
                            .myReplace(Model.FilesInfo.ShowTime6_2, GetData[i].ShowTime.GetNewDate(6, '/'))
                            .myReplace(Model.FilesInfo.ShowTimeMonth, GetData[i].ShowTime.GetNewDate("month"));
					}

					Curren.GetPageBar(Total, PageSize, "list.html?HType="+Curren.getQueryString("HType")+"&CId=" + Cid + "");
					$("#" + IDname + "").append(NewHtml);
				}
			}
		})
		return {"Total":Total,"GetData":GetData};
	},
	GetFilesInfoByCidData: function(Cid,PageSize,SearchWord) {
		PageIndex = PageIndex || 1 ;
		PageSize = PageSize||BasePageSize ;
		var Total = 0;
		var NewHtml = "";
		var GetData="";
		if(Curren.isEmpty(SearchWord)) SearchWord = "";
		var Senddata = {
			PageIndex: PageIndex,
			Cid: Cid,
			PageSize: PageSize,
			SearchWord: SearchWord
		}
		$.ajax({
			type: "GET",
			url: API + "GetFilesInfoByCid",
			async: false,
			data: Senddata,
			dataType: "json",
			success: function(data) {
				GetData = JSON.parse(data).row;
				Total = JSON.parse(data).total;
				var len = GetData.length;
				
			}
		})
		return {"Total":Total,"GetData":GetData};
	},
	//获取企业信息
	GetOrganInfoByOid: function(Oid) {
		if(Curren.isEmpty(Oid)) Oid = DefualtOrganID;
		$.ajax({
			type: "GET",
			url: API + "GetOrganInfoByOid?Oid=" + Oid,
			async: false,
			dataType: "json",

			success: function(data) {
				Model.OrganInfo = JSON.parse(data);
			}
		})
		return Model.OrganInfo;
	},
	GetFNavColumnsByCid: function(Cid, strHtml_P, strHtml, IDname,BannerID,staticLogoImg) {
		var NewHtml = "";
		var GetData;
		$.ajax({
			type: "GET",
			url: API + "GetFNavColumnsByCid?Cid=" + Cid,
			async: false,
			dataType: "json",
			success: function(data) {
				GetData = JSON.parse(data);
				if(GetData) {
					if(Curren.isEmpty(GetData.p.Url)) {
						if(GetData.p.Type == 0) {
							GetData.p.Url = "javascript:;";
						} else {
							GetData.p.Url = "list.html?HType=" + GetData.p.Type + "&CId=" + GetData.p.ID;
						}
					}
					NewHtml += strHtml_P.myReplace(Model.Vice_nav.Parent.Logo, GetData.p.Logo)
						.myReplace(Model.Vice_nav.Parent.Url, GetData.p.Url)
						.myReplace(Model.Vice_nav.Parent.Aliase, GetData.p.Aliase)
						.myReplace(Model.Vice_nav.Parent.ID, GetData.p.ID)
						.myReplace(Model.Vice_nav.Parent.Name, GetData.p.Name)
						.myReplace(Model.Vice_nav.Parent.Describe, GetData.p.Describe)
						.myReplace(Model.Vice_nav.Parent.Type, GetData.p.Type);
					if(GetData.nav.length > 0) {
						for(var i = 0; i < GetData.nav.length; i++) {
							if(Curren.isEmpty(GetData.nav[i].Url)) {
								GetData.nav[i].Url = "list.html?HType=" + GetData.nav[i].Type + "&CId=" + GetData.nav[i].ID;

							}
							var GetDataOn = Cid==GetData.nav[i].ID?'class="on"':'';
							var tLogoImg = GetData.nav[i].Logo?GetData.nav[i].Logo:staticLogoImg;
							// console.log(tLogoImg)
							NewHtml += strHtml.myReplace(Model.Vice_nav.Nav.Logo, tLogoImg)
								.myReplace(Model.Vice_nav.Nav.Url, GetData.nav[i].Url)
								.myReplace(Model.Vice_nav.Nav.Aliase, GetData.nav[i].Aliase)
								.myReplace(Model.Vice_nav.Nav.ID, GetData.nav[i].ID)
								.myReplace(Model.Vice_nav.Nav.ClassOn,GetDataOn)
								.myReplace(Model.Vice_nav.Nav.Name, GetData.nav[i].Name)
								.myReplace(Model.Vice_nav.Nav.Describe, GetData.nav[i].Describe)
								.myReplace(Model.Vice_nav.Nav.Type, GetData.nav[i].Type)

						}
					} else {
						var GetDataOn = Cid==GetData.p.ID?'class="on"':'';
						var tLogoImg = GetData.p.Logo?GetData.p.Logo:staticLogoImg;
						NewHtml += strHtml.myReplace(Model.Vice_nav.Nav.Logo,tLogoImg)
							.myReplace(Model.Vice_nav.Nav.Url, GetData.p.Url)
							.myReplace(Model.Vice_nav.Nav.Aliase, GetData.p.Aliase)
							.myReplace(Model.Vice_nav.Nav.ID, GetData.p.ID)
							.myReplace(Model.Vice_nav.Nav.ClassOn,GetDataOn)
							.myReplace(Model.Vice_nav.Nav.Name, GetData.p.Name)
							.myReplace(Model.Vice_nav.Nav.Type, GetData.p.Type)
					}
					if(Curren.isEmpty(IDname)) IDname = Cid;
					if(!Curren.isEmpty(BannerID)&&GetData.p.Logo&&GetData.p.Logo.length>25) {$("#" + BannerID + "").css("background-image",'url('+GetData.p.Logo+')');}
					$("#" + IDname + "").html(NewHtml);
				}

			}
		})
		return GetData;
	},

	GetCNavColumnsByCid: function(Cid, strHtml, IDname) {
		var NewHtml = "";
		var GetData;
		$.ajax({
			type: "GET",
			url: API + "GetCNavColumnsByCid?Cid=" + Cid,
			async: false,
			dataType: "json",
			success: function(data) {
				GetData = JSON.parse(data);

			}

		})
		return GetData;
	},
	GetFNavColumnsByCidWithoutParent: function(Cid, strHtml, IDname,StartNum,EndNum) {
		var NewHtml = "";

		$.ajax({
			type: "GET",
			url: API + "GetFNavColumnsByCid?Cid=" + Cid,
			async: false,
			dataType: "json",
			success: function(data) {
				var GetData = JSON.parse(data);
				if (Curren.isEmpty(EndNum)||EndNum>GetData.nav.length) EndNum = GetData.nav.length;
				if (EndNum>GetData.nav.length) EndNum
				if (Curren.isEmpty(StartNum)) StartNum = 0;
				if(GetData) {
					if(GetData.nav.length > 0) {
						for(var i = StartNum; i <EndNum; i++) {
							if(Curren.isEmpty(GetData.nav[i].Url)) {
								GetData.nav[i].Url = "list.html?HType=" + GetData.nav[i].Type + "&CId=" + GetData.nav[i].ID;

							}
							NewHtml += strHtml.myReplace(Model.Vice_nav.Nav.Logo, GetData.nav[i].Logo)
								.myReplace(Model.Vice_nav.Nav.Url, GetData.nav[i].Url)
								.myReplace(Model.Vice_nav.Nav.Aliase, GetData.nav[i].Aliase)
								.myReplace(Model.Vice_nav.Nav.ID, GetData.nav[i].ID)
								.myReplace(Model.Vice_nav.Nav.Name, GetData.nav[i].Name)
								.myReplace(Model.Vice_nav.Nav.Type, GetData.nav[i].Type)

						}
					}
					if(Curren.isEmpty(IDname)) IDname = Cid;
					$("#" + IDname + "").html(NewHtml);
				}
			}
		})
	},
	GetInfoBySearch:function (selText,IDname,strHtml,did,pageSize) {
		var NewHtml="";
		var GetData=[];
		if (Curren.isEmpty(did)) did=DefualtDepartmentID;
		var pageIndex=Curren.getQueryString("PageIndex");
		if (Curren.isEmpty(pageIndex)) pageIndex=1;
		var SendData={
			selText:selText,
			pageIndex:pageIndex,
			did:did,
			pageSize: pageSize,
		}
		$.ajax({
			type: "GET",
			url: API + "GetInfoBySearch",
			async: false,
			dataType: "json",
			data: SendData,
			success: function(data) {
				 GetData = JSON.parse(data);
				if(GetData) {
				    GetData = JSON.parse(data).row;
					Total = JSON.parse(data).total;
					var len = GetData.length;
					if(len > 0) {
						for(var i = 0; i < len; i++) {
							NewHtml += strHtml
								.myReplace(Model.NewsInfos.ID, GetData[i].ID)
								.myReplace(Model.NewsInfos.Author, GetData[i].Author)
								.myReplace(Model.NewsInfos.Describe, GetData[i].Describe)
								.myReplace(Model.NewsInfos.HasPhoto, GetData[i].HasPhoto)
								.myReplace(Model.NewsInfos.Hot, GetData[i].Hot)
								.myReplace(Model.NewsInfos.KeyWord, GetData[i].KeyWord)
								.myReplace(Model.NewsInfos.ShowTime, GetData[i].ShowTime.GetNewDate())
								.myReplace(Model.NewsInfos.Source, GetData[i].Source)
								.myReplace(Model.NewsInfos.Title, GetData[i].Title)
								.myReplace(Model.NewsInfos.Top, GetData[i].Top)
								.myReplace(Model.NewsInfos.Url, (Curren.isEmpty(GetData[i].Url) ? "list.html?HType=2&CId=" + GetData[i].ColumnID + "&NId=" + GetData[i].ID : GetData[i].Url))
								.myReplace(Model.NewsInfos.ShowTime2, GetData[i].ShowTime.GetNewDate(2))
								.myReplace(Model.NewsInfos.ShowTime6, GetData[i].ShowTime.GetNewDate(6))
								.myReplace(Model.NewsInfos.ShowTime6_2, GetData[i].ShowTime.GetNewDate(6, '-'));
						}
						Curren.GetPageBar(Total, pageSize, "search.html?selText=" + selText);
						$("#" + IDname + "").html(NewHtml);
					}
				}
			}
		})
		return GetData;
	},
	//发送信息收集
	sendStudentMessage:function (obj) {
		var result=null;
		var Senddata = {
			StudentName: obj.StudentName,
			StudentSex: obj.StudentSex,
			StudentAge: obj.StudentAge||1,
			PhoneNumber:obj.PhoneNumber,
			ProfessionalApply: obj.ProfessionalApply,
			ColumnID: obj.ColumnID
		};
		$.ajax({
			type: "GET",
			url:API+"StudnetApply",
			async: false,
			data:Senddata,
			dataType: "json",
			success:function (data) {

				result={
					state:data.split(":")[0],
					message:data.split(":")[1]
				}
			},
		});
		return result;
	},

//留言板功能
	getMsg:function(cid,pageIndex,pageSize){
		var GetData =null;
		var Senddata = {
			cid:cid,
			pageIndex:pageIndex,
			pageSize:pageSize
		};
		$.ajax({
			type: "GET",
			url:API+"getMsg",
			async: false,
			data:Senddata,
			dataType: "json",
			success:function (data) {
				GetData =JSON.parse(data).row
			},
		});
		return GetData;
	},
	addMsg:function(cid,msg,id,name){
		var GetData =null;
		name = name||"匿名用户";
		var Senddata = {
			ColumnID:cid,
			Info:msg,
			Target:id,
			UserName:name
		};
		$.ajax({
			type: "POST",
			// url:API+"addMsg?cid="+cid+"&msg="+msg+"&id="+id+"&name="+name,
			url:API+"addMsg",
			async: false,
			data:Senddata,
			dataType: "json",
			success:function (data) {
				GetData =data;
			},
		});
		return GetData;
	},
	// 获取上下条新闻
	GetInfosByNid:function(Nid){
		var GetData =null;
		$.ajax({
			type: "GET",
			url:API+"GetInfosByNid?Nid="+Nid,
			async: false,
			dataType: "json",
			success:function (data) {
				GetData =JSON.parse(data)
			},
		});
		return GetData;
	},
	// 发送邮件
	sendMail:function(Senddata){
	    var result=null;
	    var Senddata = {
	      Name: Senddata.Name,
	      Email: Senddata.Email,
	      Mobile: Senddata.Mobile,
	      Title:Senddata.Title,
	      Info: Senddata.Info,
	      ColumnID: Senddata.ColumnID
	    };
	    $.ajax({
	      type: "post",
	      url:API+"AddMail",
	      async: false,
	      data:Senddata,
	      dataType: "json",
	      success:function (data) {
	        data=JSON.parse(data)
	        result={
	          state:data.state == 'no'? '发生失败':"发送成功",
	          message:data.msg
	        }
	      },
	      error:function () {
	        result={
	          state:'发生失败',
	          message:'··'
	        }
	      }
	    });
	    return result
	  },
	  GetStuCircleList:function(state){
		var GetData =null;
		state?'':state=1;
		$.ajax({
			type: "GET",
			url:API+"GetStuCircleList?state="+state,
			async: false,
			dataType: "json",
			success:function (data) {
				GetData =JSON.parse(data)
			},
		});
		return GetData;
	},
	//获取所有栏目（包括未激活导航属性）
	GetColumnsByDid:function (Did) {
		Did=Did?Did:DefualtDepartmentID;
		var GetData="";
		$.ajax({
			type:"get",
			url:API+"GetColumnsByDid",
			data:{Did:Did},
			async:false,
			success:function (data) {
				GetData =JSON.parse(data);
				//添加链接
				for (var i=0;i<GetData.length;i++){
					GetData[i].Url="list.html?HType="+GetData[i].Type+"&CId="+GetData[i].ID;
				}
			}
		})
		return GetData;
	}
};


//头部导航及logo
var arr=[];//所有栏目集合
var arrHot=[];

function getHeadNav(navSelector,head_logoSelector){

	var CId = Curren.getQueryString("CId");

	if(Curren.isEmpty(CId))CId=-1;
	arr = Base.GetNavColumnsByDid();

	var arr1=[];
	  if(!arr)arr=[];

    for(var i =0;i<arr1.length;i++){
	   var temArr=[];
		 for(var j=0;j<arr.length;j++){arr[j].FID== arr1[i].ID?temArr.push(arr[j]):'';}

	   arr1[i].Children=temArr;
	}
	var strHtml='';
	var kk=0;
    for(var i = 0; i < arr1.length; i++) {
        if(arr1[i].Children.length>0){
			var arr2Html="";
			var arr1OnFlag=false;
            for(var j=0;j<arr1[i].Children.length;j++){
				CId==arr1[i].Children[j].ID?arr1OnFlag=true:"";
			    arr2Html+='<a href="'+arr1[i].Children[j].Url+'" '+(arr1[i].Children[j].Url.indexOf('//')==-1?'':'target="_blank"')+' ><span class="text">'+arr1[i].Children[j].Name+'</span></a>';
			}
			strHtml+='<li class="'+(arr1OnFlag?' on':'')+'"><a class="tit ripple"  href="'+arr1[i].Url+'" ><i></i>'+arr1[i].Name+'</a><ul class="nav_list">\n'+arr2Html+'</ul></li>';
        }
        else strHtml+='<li class="'+(CId==arr1[i].ID?' on':'')+'"><a class="tit ripple"  href="'+arr1[i].Url+'" '+(arr1[i].Url.indexOf('//')==-1?'':'target="_blank"')+' ><i></i>'+arr1[i].Name+'</a></li>\n';
    }
    
	$(navSelector).append(strHtml);
}

var  $_arrowFunction ="var t = () => {};" ;
var $_HOPE = {};
try{
  let $_fv = new Function($_arrowFunction);
   $_HOPE = {
    web: "Five",
    Design: "LZP",
    Plan: "XXX"
  }
  console.log("%c   http://www.hopeedu.com/   ","font-size: 18px;line-height: 25px;height:30px; padding-top:30px ; color:red;background: url('http://www.hopeedu.com/Content/pc_ch/img/logo.png') no-repeat top; padding-top:60px;margin-top:6px; margin-bottom:6px;text-shadow:2px 1px 3px #9e9e9ee2;")
  console.log("  %c 本页面由 %c希望教育集团-网站建设部 %c提供 ", "color:red;background:#999;text-shadow:2px 2px 4px #DA251De2; padding: 5px 2px","color:#005CE6;font-weight:bold;background:#999;font-size:14px; text-shadow:2px 2px 3px #005CE6e2; padding: 4px 0","color:red; background:#999; padding: 5px 0;text-shadow:2px 2px 4px #DA251De2;","");
}catch (e){
  console.log("不支持es6")
}
