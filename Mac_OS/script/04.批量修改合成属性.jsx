{
	// rd_CompSetter.jsx
	// Copyright (c) 2006-2011 redefinery (Jeffrey R. Almasol). All rights reserved.
	// check it: www.redefinery.com
	// 
	// Name: rd_CompSetter
	// Version: 2.7
	// 
	// Description:
	// This script displays a palette with controls for changing the 
	// size, pixel aspect ratio, duration, and frame rate of the 
	// selected compositions, and all nested compositions 
	// (pre-comp layers) in it. When you lengthen the composition's
	// duration, all layers whose out points are at or beyond the 
	// end of the composition are also lengthened to the new 
	// duration, including layers within pre-comps.
	// 
	// Note: This version of the script requires After Effects CS3 
	// or later. It can be used as a dockable panel by placing the 
	// script in a ScriptUI Panels subfolder of the Scripts folder, 
	// and then choosing this script from the Window menu.
	// 
	// Originally requested by Stu Maschwitz.
	// Updates requested by Matthew Crnich.
	// 
	// Legal stuff:
	// This script is provided "as is," without warranty of any kind, expressed
	// or implied. In no event shall the author be held liable for any damages 
	// arising in any way from the use of this script.
	// 
	// In other words, I'm just trying to share knowledge with and help out my
	// fellow AE script heads, so don't blame me if my code doesn't rate. :-)

	// rd_CompSetter()
	// 
	// Description:
	// This function contains the main logic for this script.
	// 
	// Parameters:
	// thisObj - "this" object.
	// 
	// Returns:
	// Nothing.
	//
	function rd_CompSetter(thisObj)
	{
		// Globals
		
		var rd_CompSetterData = new Object();	// Store globals in an object
		rd_CompSetterData.scriptName = "合成重设置工具";
		rd_CompSetterData.scriptTitle = rd_CompSetterData.scriptName + " v2.7";
		
		rd_CompSetterData.strDuration = {en: "时长:"};
		rd_CompSetterData.strDurationAsFrames = {en: "帧"};
		rd_CompSetterData.strDurationAsSecs = {en: "秒"};
		rd_CompSetterData.strFPS = {en: "帧率:"};
		rd_CompSetterData.strFPSCaption = {en: "帧"};
		rd_CompSetterData.strWidth = {en: "宽度:"};
		rd_CompSetterData.strHeight = {en: "高度:"};
		rd_CompSetterData.strSizeCaption = {en: "像素"};
		rd_CompSetterData.strPAR = {en: "像素:"};
		rd_CompSetterData.strRecursive = {en: "是否运用于子合成"};
		rd_CompSetterData.strApply = {"en": "应用"};
		rd_CompSetterData.strHelp = {"en": "?"};
		rd_CompSetterData.strErrNoProj = {en: "无法进行操作。请创建或打开一个项目，打开一个单一合成，并再次尝试。"};
		rd_CompSetterData.strErrNoCompSel = {en: "无法进行操作。请在“项目”窗口中选择或打开一个单一的合成，然后再试一次。"};
		rd_CompSetterData.strMinAE80 = {en: "该脚本需要运行在 Adobe After Effects CS3 以上版本。"};
		rd_CompSetterData.strHelpText = 
		{
			"en": "Copyright (c) 2006-2010 redefinery (Jeffrey R. Almasol). \n" +
			"All rights reserved.  2017 LimboEric 汉化\n" +
			"\n" +
			"本脚本支持多选、批量修改合成宽度、高度、像素宽高比、帧速率、时间长度\n"
		};
		
		
		
		
		// rd_CompSetter_localize()
		// 
		// Description:
		// This function localizes the given string variable based on the current locale.
		// 
		// Parameters:
		//   strVar - The string variable's name.
		// 
		// Returns:
		// String.
		//
		function rd_CompSetter_localize(strVar)
		{
			return strVar["en"];
		}
		
		
		
		
		// rd_CompSetter_buildUI()
		// 
		// Description:
		// This function builds the user interface.
		// 
		// Parameters:
		// thisObj - Panel object (if script is launched from Window menu); null otherwise.
		// 
		// Returns:
		// Window or Panel object representing the built user interface.
		//
		function rd_CompSetter_buildUI(thisObj)
		{
			var pal = (thisObj instanceof Panel) ? thisObj : new Window("palette", rd_CompSetterData.scriptName, undefined, {resizeable:true});
			
			if (pal != null)
			{
				var res = 
				"group { \
					orientation:'column', alignment:['fill','top'], \
					header: Group { \
						alignment:['fill','top'], \
						title: StaticText { text:'" + rd_CompSetterData.scriptName + "', alignment:['fill','center'] }, \
						help: Button { text:'" + rd_CompSetter_localize(rd_CompSetterData.strHelp) +"', maximumSize:[30,20], alignment:['right','center'] }, \
					}, \
					width: Group { \
						alignment:['fill','top'], alignChildren:['left','center'], \
						opt: Checkbox { text:'" + rd_CompSetter_localize(rd_CompSetterData.strWidth) + "', value:true }, \
						fld: EditText { text:'1920', characters:7 }, \
						uom: StaticText { text:'" + rd_CompSetter_localize(rd_CompSetterData.strSizeCaption) + "' }, \
					}, \
					height: Group { \
						alignment:['fill','top'], alignChildren:['left','center'], \
						opt: Checkbox { text:'" + rd_CompSetter_localize(rd_CompSetterData.strHeight) + "', value:true }, \
						fld: EditText { text:'1080', characters:7 }, \
						uom: StaticText { text:'" + rd_CompSetter_localize(rd_CompSetterData.strSizeCaption) + "' }, \
					}, \
					par: Group { \
						alignment:['fill','top'], alignChildren:['left','center'], \
						opt: Checkbox { text:'" + rd_CompSetter_localize(rd_CompSetterData.strPAR) + "', value:true }, \
						fld: EditText { text:'1.0', characters:7 }, \
					}, \
					fps: Group { \
						alignment:['fill','top'], alignChildren:['left','center'], \
						opt: Checkbox { text:'" + rd_CompSetter_localize(rd_CompSetterData.strFPS) + "', value:true }, \
						fld: EditText { text:'29.97', characters:7 }, \
						uom: StaticText { text:'" + rd_CompSetter_localize(rd_CompSetterData.strFPSCaption) + "' }, \
					}, \
					dur: Group { \
						alignment:['fill','top'], alignChildren:['left','center'], \
						opt: Checkbox { text:'" + rd_CompSetter_localize(rd_CompSetterData.strDuration) + "', value:true }, \
						fld: EditText { text:'300', characters:7 }, \
						durFrames: RadioButton { text:'" + rd_CompSetter_localize(rd_CompSetterData.strDurationAsFrames) + "', value:true }, \
						durSecs: RadioButton { text:'" + rd_CompSetter_localize(rd_CompSetterData.strDurationAsSecs) + "' }, \
					}, \
					sep: Group { \
						orientation:'row', alignment:['fill','top'], \
						rule: Panel { \
							height: 2, alignment:['fill','center'], \
						}, \
					}, \
					recursive: Checkbox { text:'"  + rd_CompSetter_localize(rd_CompSetterData.strRecursive) + "', value:true, alignment:['fill','center'] }, \
					cmds: Group { \
						alignment:['right','top'], \
						applyBtn: Button { text:'" + rd_CompSetter_localize(rd_CompSetterData.strApply) + "' }, \
					}, \
				}";
				pal.grp = pal.add(res);
				
				// Workaround to ensure the edittext text color is black, even at darker UI brightness levels
				var winGfx = pal.graphics;
				var darkColorBrush = winGfx.newPen(winGfx.BrushType.SOLID_COLOR, [0,0,0], 1);
				pal.grp.width.fld.graphics.foregroundColor = darkColorBrush;
				pal.grp.height.fld.graphics.foregroundColor = darkColorBrush;
				pal.grp.par.fld.graphics.foregroundColor = darkColorBrush;
				pal.grp.fps.fld.graphics.foregroundColor = darkColorBrush;
				pal.grp.dur.fld.graphics.foregroundColor = darkColorBrush;
				
				pal.grp.width.opt.preferredSize.width = 
					pal.grp.height.opt.preferredSize.width = 
					pal.grp.par.opt.preferredSize.width = 
					pal.grp.dur.opt.preferredSize.width = pal.grp.fps.opt.preferredSize.width;
				
				pal.layout.layout(true);
				pal.grp.minimumSize = pal.grp.size;
				pal.layout.resize();
				pal.onResizing = pal.onResize = function () {this.layout.resize();}
				
				pal.grp.width.opt.onClick = pal.grp.height.opt.onClick = pal.grp.fps.opt.onClick = function ()
				{
					var state = this.value;
					this.parent.fld.enabled = this.parent.uom.enabled = state;
					if (state)
						this.parent.fld.active = true;
				}
				pal.grp.par.opt.onClick = function ()
				{
					var state = this.value;
					this.parent.fld.enabled = state;
					if (state)
						this.parent.fld.active = true;
				}
				pal.grp.dur.opt.onClick = function ()
				{
					var state = this.value;
					this.parent.fld.enabled = this.parent.durFrames.enabled = this.parent.durSecs.enabled = state;
					if (state)
						this.parent.fld.active = true;
				}
				
				pal.grp.width.fld.onChange = pal.grp.height.fld.onChange = function ()
				{
					var enteredValue = parseInt(this.text);
					
					if (isNaN(enteredValue) || (enteredValue < 4))
						this.text = "4";
					else if (enteredValue > 30000)
						this.text = "30000";
					else
						this.text = enteredValue.toString();
				}
				
				pal.grp.par.fld.onChange = function ()
				{
					var enteredValue = parseFloat(this.text);
					
					if (isNaN(enteredValue) || (enteredValue < 0.01))
						this.text = "1";
					else if (enteredValue > 99)
						this.text = "99";
					else
						this.text = enteredValue.toString();
				}
				
				pal.grp.fps.fld.onChange = function ()
				{
					var enteredValue = this.text;
					
					if (isNaN(enteredValue) || (enteredValue <= 1))
						this.text = "1";
					else if (enteredValue > 99)
						this.text = "99";
				}
				
				pal.grp.dur.fld.onChange = function ()
				{
					var enteredValue = this.text;
					
					if (isNaN(enteredValue) || (enteredValue <= 0))
						this.text = "1";
					else if (this.parent.durFrames.value)
						this.text = parseInt(this.text).toString();
				}
				
				pal.grp.dur.durFrames.onClick = function ()
				{
					// In frames mode, we need an integer number of frames
					this.parent.parent.fld.text = parseInt(this.parent.parent.fld.text).toString();
				}
				
				pal.grp.header.help.onClick = function () {alert(rd_CompSetterData.scriptTitle + "\n" + rd_CompSetter_localize(rd_CompSetterData.strHelpText), rd_CompSetterData.scriptName);}
				pal.grp.cmds.applyBtn.onClick = rd_CompSetter_doCompSetter;
			}
			
			return pal;
		}
		
		
		
		
		function rd_CompSetter_compSetRecursively(comp, width, height, par, fps, dur, recurse)
		{
			var layer;
			var oldCompDur = comp.duration;
			
			// Change the comp's size
			if (width != -1)
				comp.width = width;
			if (height != -1)
				comp.height = height;
			
			// Change the comp's par
			if (par != -1)
				comp.pixelAspect = par;
			
			// Change the comp's frame rate
			if (fps != -1)
				comp.frameRate = fps;
			
			// Change the comp's duration
			if (dur != -1)
				comp.duration = dur;
			
			for (var i=1; i<=comp.numLayers; i++)
			{
				layer = comp.layer(i);
				
				// Recurse into pre-comps
				if (recurse && (layer instanceof AVLayer) && (layer.source != null) && (layer.source instanceof CompItem))
					rd_CompSetter_compSetRecursively(layer.source, width, height, par, fps, dur, recurse);
				
				// Lengthen layer
				if (dur != -1)
				{
					if (layer.stretch >= 0)
					{
						if (layer.outPoint >= oldCompDur)
							layer.outPoint = comp.duration;
					}
					else
					{
						if (layer.inPoint >= oldCompDur)
						{
							var oldOutPt = layer.outPoint;
							layer.inPoint = comp.duration;
							layer.outPoint = oldOutPt;
						}
					}
				}
			}
		}
		
		
		
		
		// rd_CompSetter_doCompSetter()
		// 
		// Description:
		// This callback function change the selected composition 
		// based on the settings provided.
		// 
		// Parameters:
		// None.
		// 
		// Returns:
		// Nothing.
		//
		function rd_CompSetter_doCompSetter()
		{
			// Check that a project exists
			if (app.project == null)
			{
				alert(rd_CompSetter_localize(rd_CompSetterData.strErrNoProj), rd_CompSetterData.scriptName);
				return;
			}
			
			var proj = app.project;
			
			// Do the work
			app.beginUndoGroup(rd_CompSetterData.scriptName);
			
			// Loop through all selected comps
			for (var i=0; i<proj.selection.length; i++)
			{
				var comp = proj.selection[i];
				if (!(comp instanceof CompItem))
					continue;
				
				var newWidth = this.parent.parent.width.opt.value ? parseInt(this.parent.parent.width.fld.text) : -1;
				var newHeight = this.parent.parent.height.opt.value ? parseInt(this.parent.parent.height.fld.text) : -1;
				var newPAR = this.parent.parent.par.opt.value ? parseFloat(this.parent.parent.par.fld.text) : -1;
				
				var newDur = this.parent.parent.dur.opt.value ? parseFloat(this.parent.parent.dur.fld.text) : -1;
				if (this.parent.parent.dur.durFrames.value && (newDur != -1))
					newDur /= comp.frameRate;
				
				var newFPS = this.parent.parent.fps.opt.value ? parseFloat(this.parent.parent.fps.fld.text) : -1;
				
				rd_CompSetter_compSetRecursively(comp, newWidth, newHeight, newPAR, newFPS, newDur, this.parent.parent.recursive.value);
			}
			
			app.endUndoGroup();
		}
		
		
		
		
		// main code:
		//
		
		// Prerequisites check
		if (parseFloat(app.version) < 8.0)
			alert(rd_CompSetter_localize(rd_CompSetterData.strMinAE80), rd_CompSetterData.scriptName);
		else
		{
			// Build and show the console's floating palette
			var rdcsePal = rd_CompSetter_buildUI(thisObj);
			if (rdcsePal != null)
			{
				if (app.settings.haveSetting("redefinery", "rd_CompSetter_widthOpt"))
					rdcsePal.grp.width.opt.value = (app.settings.getSetting("redefinery", "rd_CompSetter_widthOpt") == "false") ? false : true;
				if (app.settings.haveSetting("redefinery", "rd_CompSetter_width"))
					rdcsePal.grp.width.fld.text = parseInt(app.settings.getSetting("redefinery", "rd_CompSetter_width")).toString();
				rdcsePal.grp.width.fld.enabled = rdcsePal.grp.width.opt.value;
				
				if (app.settings.haveSetting("redefinery", "rd_CompSetter_heightOpt"))
					rdcsePal.grp.height.opt.value = (app.settings.getSetting("redefinery", "rd_CompSetter_heightOpt") == "false") ? false : true;
				if (app.settings.haveSetting("redefinery", "rd_CompSetter_height"))
					rdcsePal.grp.height.fld.text = parseInt(app.settings.getSetting("redefinery", "rd_CompSetter_height")).toString();
				rdcsePal.grp.height.fld.enabled = rdcsePal.grp.height.opt.value;
				
				if (app.settings.haveSetting("redefinery", "rd_CompSetter_parOpt"))
					rdcsePal.grp.par.opt.value = (app.settings.getSetting("redefinery", "rd_CompSetter_parOpt") == "false") ? false : true;
				if (app.settings.haveSetting("redefinery", "rd_CompSetter_par"))
					rdcsePal.grp.par.fld.text = parseFloat(app.settings.getSetting("redefinery", "rd_CompSetter_par")).toString();
				rdcsePal.grp.par.fld.enabled = rdcsePal.grp.par.opt.value;
				
				if (app.settings.haveSetting("redefinery", "rd_CompSetter_fpsOpt"))
					rdcsePal.grp.fps.opt.value = (app.settings.getSetting("redefinery", "rd_CompSetter_fpsOpt") == "false") ? false : true;
				if (app.settings.haveSetting("redefinery", "rd_CompSetter_fps"))
					rdcsePal.grp.fps.fld.text = parseFloat(app.settings.getSetting("redefinery", "rd_CompSetter_fps")).toString();
				rdcsePal.grp.fps.fld.enabled = rdcsePal.grp.fps.opt.value;
				
				if (app.settings.haveSetting("redefinery", "rd_CompSetter_durOpt"))
					rdcsePal.grp.dur.opt.value = (app.settings.getSetting("redefinery", "rd_CompSetter_durOpt") == "false") ? false : true;
				if (app.settings.haveSetting("redefinery", "rd_CompSetter_dur"))
					rdcsePal.grp.dur.fld.text = parseFloat(app.settings.getSetting("redefinery", "rd_CompSetter_dur")).toString();
				if (app.settings.haveSetting("redefinery", "rd_CompSetter_durFrames"))
					rdcsePal.grp.dur.durFrames.value = (app.settings.getSetting("redefinery", "rd_CompSetter_durFrames") == "false") ? false : true;
				if (app.settings.haveSetting("redefinery", "rd_CompSetter_durSecs"))
					rdcsePal.grp.dur.durSecs.value = (app.settings.getSetting("redefinery", "rd_CompSetter_durSecs") == "false") ? false : true;
				rdcsePal.grp.dur.fld.enabled = rdcsePal.grp.dur.durFrames.enabled = rdcsePal.grp.dur.durSecs.enabled = rdcsePal.grp.dur.opt.value;
				
				if (app.settings.haveSetting("redefinery", "rd_CompSetter_recursive"))
					rdcsePal.grp.recursive.value = (app.settings.getSetting("redefinery", "rd_CompSetter_recursive") == "false") ? false : true;
				
				// Save current UI settings upon closing the palette
				rdcsePal.onClose = function()
				{
					app.settings.saveSetting("redefinery", "rd_CompSetter_widthOpt", this.grp.width.opt.value);
					app.settings.saveSetting("redefinery", "rd_CompSetter_width", this.grp.width.fld.text);
					app.settings.saveSetting("redefinery", "rd_CompSetter_heightOpt", this.grp.height.opt.value);
					app.settings.saveSetting("redefinery", "rd_CompSetter_height", this.grp.height.fld.text);
					app.settings.saveSetting("redefinery", "rd_CompSetter_parOpt", this.grp.par.opt.value);
					app.settings.saveSetting("redefinery", "rd_CompSetter_par", this.grp.par.fld.text);
					app.settings.saveSetting("redefinery", "rd_CompSetter_fpsOpt", this.grp.fps.opt.value);
					app.settings.saveSetting("redefinery", "rd_CompSetter_fps", this.grp.fps.fld.text);
					app.settings.saveSetting("redefinery", "rd_CompSetter_durOpt", this.grp.dur.opt.value);
					app.settings.saveSetting("redefinery", "rd_CompSetter_dur", this.grp.dur.fld.text);
					app.settings.saveSetting("redefinery", "rd_CompSetter_durFrames", this.grp.dur.durFrames.value);
					app.settings.saveSetting("redefinery", "rd_CompSetter_durSecs", this.grp.dur.durSecs.value);
					app.settings.saveSetting("redefinery", "rd_CompSetter_recursive", this.grp.recursive.value);
				}
				
				if (rdcsePal instanceof Window)
				{
					// Show the palette
					rdcsePal.center();
					rdcsePal.show();
				}
				else
					rdcsePal.layout.layout(true);
			}
		}
	}
	
	
	rd_CompSetter(this);
}
