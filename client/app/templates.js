angular.module('simple-chat.app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('app/account/login/login.html',
    "<div class=container-fluid><div class=row><div class=col-sm-12><h1>Login</h1></div><div class=col-sm-12><form name=form ng-submit=\"form.$valid &amp;&amp; login()\" novalidate class=form><div class=form-group><label>Email</label><input name=email ng-model=user.email class=\"form-control\"></div><div class=form-group><label>Password</label><input type=password name=password ng-model=user.password class=\"form-control\"></div><div class=\"form-group has-error\"><p ng-show=\"form.email.$error.required &amp;&amp; form.password.$error.required &amp;&amp; submitted\" class=help-block>Please enter your email and password.</p><p class=help-block>{{ errors.other }}</p></div><div><button type=submit class=\"btn btn-inverse btn-lg btn-login\">Login</button></div></form></div></div></div>"
  );


  $templateCache.put('app/components/admin/admin.html',
    "<md-content layout=column class=md-padding><md-button type=button ng-click=removeAll() class=\"remove-messages md-raised md-warn\">Remove All Messages</md-button><md-list><md-item ng-repeat=\"user in users\"><md-item-content><div class=md-tile-content><div class=pull-left><h3><strong>{{user.name}}</strong></h3><h4 class=text-muted>{{user.email}}</h4></div><a ng-click=delete(user) class=\"trash pull-right\"><i class=\"fa fa-trash-o\"></i></a></div></md-item-content></md-item></md-list></md-content>"
  );


  $templateCache.put('app/components/emojis/emoji-template.html',
    "<li><i title=\":&quot; + ${name} + &quot;:\" class=\"emoji emoji_${name}\">&nbsp</i><span>&nbsp ${name}</span></li>"
  );


  $templateCache.put('app/components/emojis/emojis.html',
    "<md-content flex=flex><md-grid-list md-cols-sm=2 md-cols-md=4 md-cols-gt-md=9 md-row-height-gt-md=1:1 md-row-height=16:9 md-gutter=8px md-gutter-gt-sm=4px class=gridListdemoDynamicTiles><md-grid-tile ng-repeat=\"emoji in emojis\" md-rowspan={{tile.span.row}} md-colspan={{tile.span.col}} ng-class=tile.background><md-icon ng-bind-html=\"emoji.view | emoji\" aria-label=Emoji></md-icon><h3>{{emoji.name}}</h3></md-grid-tile></md-grid-list></md-content>"
  );


  $templateCache.put('app/components/messages/message-view.html',
    "<span ng-class=\"::{'pull-left': message.isAuthor, 'pull-right': !message.isAuthor}\" class=chat-img><img ng-src={{::message.url}} alt={{::message.author.name}} class=\"img-circle\"></span><md-item-content><div class=md-tile-content><small ng-class=\"::{'pull-right': message.isAuthor}\" class=text-muted><i class=\"fa fa-clock-o\"></i>&nbsp<label am-time-ago=message.createdAt class=time></label></small><h3 ng-bind-html=\"::message.text | emoji\"></h3></div></md-item-content>"
  );


  $templateCache.put('app/components/messages/messages.html',
    "<md-toolbar class=\"messages md-whiteframe-z2 fix-top\"><form ng-submit=\"addMessage(newMessage); $broadcast('form:change');\" layout=row class=new-message><md-input-container class=text><label>Type your message here...</label><input ng-model=newMessage focus-on=form:change autocomplete=off st-autocomplete=emojis st-at=: st-template=\"app/components/emojis/emoji-template.html\"></md-input-container><md-input-container class=submit><md-button type=submit aria-label=Submit ng-disabled=!newMessage class=\"md-primary md-hue-1\"><i class=\"fa fa-paper-plane-o\"></i></md-button><!--md-button.md-primary.md-hue-1(aria-label='Smiles', ng-click=\"openEmojisDialog($event)\")--><!--    i.fa.fa-smile-o--></md-input-container></form></md-toolbar><md-content class=\"messages md-padding\"><p ng-if=\"!!messages &amp;&amp; !messages.length\">There are no messages</p><md-list><md-item ng-repeat=\"message in messages\" ng-class=\"::{'left': isAuthor(message), 'right': !isAuthor(message)}\"><message-view message=::message></message-view></md-item></md-list></md-content>"
  );


  $templateCache.put('app/components/settings/settings.html',
    "<md-content layout=column class=\"settings md-padding\"><h2>Change Password</h2><form name=form ng-submit=changePassword(form) layout=row><md-input-container flex=flex><label>Current Password</label><input type=password ng-model=user.oldPassword autocomplete=off db-error=\"db-error\"><p ng-show=form.password.$error.mongoose class=help-block>{{ errors.other }}</p></md-input-container><md-input-container flex=flex><label>New Password</label><input type=password ng-model=user.newPassword autocomplete=off ng-minlength=3 required db-error=\"db-error\"><p ng-show=\"(form.newPassword.$error.minlength || form.newPassword.$error.required) &amp;&amp; (form.newPassword.$dirty || submitted)\" class=help-block>Password must be at least 3 characters.</p></md-input-container><p class=help-block>{{ message }}</p><md-button type=submit aria-label=Submit class=md-primary><i class=\"fa fa-floppy-o\"></i></md-button></form></md-content>"
  );


  $templateCache.put('app/main/main.html',
    "<md-content><div ng-controller=NavigationCtrl><include view=\"'app/navigation/header.html'\"></include><include view=\"'app/navigation/sidebar.html'\"></include></div><div flex=flex ui-view=content></div></md-content>"
  );


  $templateCache.put('app/navigation/header.html',
    "<md-toolbar class=\"app-toolbar md-indigo-theme md-whiteframe-z2 fix-top\"><div tabindex=0 class=md-toolbar-tools><md-button ng-click=$mdSidenav(&quot;left&quot;).toggle(); aria-label=Menu class=\"menu-icon nornal-btn\"><i class=\"fa fa-bars\"></i></md-button><a ui-sref=home>Simple-talk</a></div></md-toolbar>"
  );


  $templateCache.put('app/navigation/sidebar.html',
    "<md-sidenav md-component-id=left class=\"md-sidenav-left md-whiteframe-z2\"><div ng-click=$mdSidenav(&quot;left&quot;).close();><md-toolbar md-theme=indigo><h1 class=md-toolbar-tools><i class=\"fa fa-cog fa-spin fa-fw\"></i>&nbsp Management</h1></md-toolbar><md-content layout=column><a ui-sref=home md-highlight=\"state.current.name == &quot;main&quot;\" md-ink-ripple=#bbb ng-if=::isLoggedIn class=\"menu-item menu-sub-item md-menu-item\"><span><i class=\"fa fa-pencil\"></i>&nbsp Talk</span></a><a ui-sref=settings md-highlight=\"state.current.name == &quot;settings&quot;\" md-ink-ripple=#bbb ng-if=::isLoggedIn class=\"menu-item menu-sub-item md-menu-item\"><span><i class=\"fa fa-sliders\"></i>&nbsp Settings</span></a><a ui-sref=admin md-highlight=\"state.current.name == &quot;admin&quot;\" md-ink-ripple=#bbb ng-if=::isAdmin class=\"menu-item menu-sub-item md-menu-item\"><span><i class=\"fa fa-database\"></i>&nbsp Admin</span></a><a ng-click=logout() md-ink-ripple=#bbb ng-if=::isLoggedIn class=\"menu-item menu-sub-item md-menu-item\"><span><i class=\"fa fa-sign-out\"></i>&nbsp Logout</span></a></md-content></div></md-sidenav>"
  );

}]);
