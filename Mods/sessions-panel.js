/*
 * Sessions Panel (a mod for Vivaldi)
 * Written by LonM, modified by boroda74
 * No Copyright Reserved
 * 
 * ko-KR translation by @dencion
 * it-IT by @folgore101
 * de-DE by @knoelli
 * nl-NL by @Vistaus
 * ja-JP by @nkay1005
 * pt-BR by @oinconquistado
 * pl-PL by @supra107
 * ru-RU by @boroda74
*/

(function advancedPanels(){
	"use strict";
	
	var OldNameDate;
	var SelectedSessions;
	var SaveFilename;
	var Options;
	var LastClickedSession = null;
	
	var CurrentWindowIsPrivate = false;
	
	const PrivateWindowsNotSavedFilenamePostfix = '!';
	const PrivateWindowsOnlyFilenamePostfix = '!!';
	
	const PrivateWindowsNotSavedDisplayedPostfix = '*';
	const PrivateWindowsOnlyDisplayedPostfix = '**';
	
	var LANGUAGE;
	var l10nLocalized;
	var sessions_lonmTitle;
	var sessions_lonmInitialHTML;
	
	
	const l10n = {
		'en-GB': {
			language_name: 'English (UK English)',
			language_btn: 'Lang',
			language_confirm: '✓ Change',
			language_cancel: '✕ Cancel',
			language_selection_tooltip: 'Select Session Panel interface language',
			title: 'Sessions',
			new_session: 'New Session',
			session_name_placeholder: 'Session Name',
			all_windows: 'All Windows',
			only_selected: 'Only Selected Tabs',
			add_session_btn: 'Add Session',
			add_session_btn_desc: 'Save current session',
			refresh_sessions_btn: '⇄',
			refresh_sessions_btn_desc: 'Refresh session list and clear session name',
			saved_sessions: 'Saved Sessions',
			sort_title: 'Sort by...',
			sort_date: 'Sort by Date',
			sort_name: 'Sort by Name',
			sort_asc: 'Sort Ascending',
			sort_desc: 'Sort Descending',
			delete_button: 'Delete selected session(s)',
			delete_prompt: 'Are you sure you want to delete session $T?',
			delete_number_sessions: 'Are you sure you want to delete $N selected sessions?',
			delete_number_sessions_general: '',
			number_sessions_1_form: '',
			number_sessions_2_4_form: '',
			number_sessions_5_20_form: '',
			delete_confirm: '⚠ Yes, delete',
			action_cancel: 'No, don\'t',
			open_number_sessions: 'Are you sure you want to open $N selected sessions?',
			open_number_sessions_general: '',
			open_confirm: '⚠ Yes, open',
			overwrite_prompt: 'Are you sure you want to overwrite session $T?',
			overwrite_confirm: '⚠ Yes, overwrite',
			time_created_label: 'Created <time></time>',
			today_label: 'today',
			open_in_new_window_button: 'Open selected session(s) in new window',
			open_in_current_window_button: 'Open selected session(s) in current window',
			private_windows_not_saved_label: 'Private window(s) not saved',
			private_windows_only_label: 'Private window(s) only',
			tabs_label: 'Tabs: ',
			windows_label: 'windows: ',
		},
		'ru-RU': {
			language_name: 'Russian (Русский)',
			language_btn: 'Lang',
			language_confirm: '✓ Изменить',
			language_cancel: '✕ Отмена',
			language_selection_tooltip: 'Выбрать язык интерфейса',
			title: 'Сессии',
			new_session: 'Новая сессия',
			session_name_placeholder: 'Имя сессии',
			all_windows: 'Все окна',
			only_selected: 'Выбранные вкладки',
			add_session_btn: 'Добавить сессию',
			add_session_btn_desc: 'Сохранить текущую сессию',
			refresh_sessions_btn: '⇄',
			refresh_sessions_btn_desc: 'Обновить список сессий и очистить имя сессии',
			saved_sessions: 'Сохраненные сессии',
			sort_title: 'Сортировать по...',
			sort_date: 'Сортировать по дате',
			sort_name: 'Сортировать по имени',
			sort_asc: 'По возрастанию',
			sort_desc: 'По убыванию',
			delete_button: 'Удалить выбранные сессии',
			delete_prompt: 'Вы уверены, что хотите удалить сессию $T?',
			delete_number_sessions: 'Вы уверены, что хотите удалить $N выбранные сессии?',
			delete_number_sessions_general: 'Вы уверены, что хотите удалить $N?',
			number_sessions_1_form: 'выбранную сессию',
			number_sessions_2_4_form: 'выбранные сессии',
			number_sessions_5_20_form: 'выбранных сессий',
			delete_confirm: '⚠ Да, удалить',
			action_cancel: 'Нет, не надо',
			open_number_sessions: 'Вы уверены, что хотите открыть $N выбранные сессии?',
			open_number_sessions_general: 'Вы уверены, что хотите открыть $N?',
			open_confirm: '⚠ Да, открыть',
			overwrite_prompt: 'Вы уверены, что хотите перезаписать сессию $T?',
			overwrite_confirm: '⚠ Да, перезаписать',
			time_created_label: 'Создано <time></time>',
			today_label: 'сегодня',
			open_in_new_window_button: 'Открыть в новом окне выбранные сессии',
			open_in_current_window_button: 'Открыть в текущем окне выбранные сессии',
			private_windows_not_saved_label: 'Приватные окна не сохранены',
			private_windows_only_label: 'Только приватные окна',
			tabs_label: 'Вкладок: ',
			windows_label: 'окон: ',
		},
		'ko-KR': {
			language_name: 'Korean (한국어)',
			language_btn: 'Lang',
			language_confirm: '✓ Change',
			language_cancel: '✕ Cancel',
			language_selection_tooltip: 'Select Session Panel interface language',
			title: '세션',
			new_session: '새로운 세션',
			session_name_placeholder: '세션 이름',
			all_windows: '모든 창',
			only_selected: '선택한 탭만',
			add_session_btn: '세션 추가',
			add_session_btn_desc: '세션 추가',
			refresh_sessions_btn: '⇄',
			refresh_sessions_btn_desc: 'Refresh session list and clear session name',
			saved_sessions: 'Saved Sessions',
			sort_title: '정렬',
			sort_date: '날짜순 정렬',
			sort_name: '이름순 정렬',
			sort_asc: '오름차순 정렬',
			sort_desc: '내림차순 정렬',
			delete_button: '이 세션을 지우기',
			delete_prompt: '$T 세션을 지우시겠습니까?',
			delete_number_sessions: '선택한 $N개의 세션을 지우시겠습니까?',
			delete_number_sessions_general: '',
			number_sessions_1_form: '',
			number_sessions_2_4_form: '',
			number_sessions_5_20_form: '',
			delete_confirm: '⚠네',
			action_cancel: '아니오',
			open_number_sessions: 'Are you sure you want to open $N selected sessions?',
			open_number_sessions_general: '',
			open_confirm: '⚠ Yes, open',
			overwrite_prompt: 'Are you sure you want to overwrite session $T?',
			overwrite_confirm: '⚠ Yes, overwrite',
			time_created_label: '만든 시각 <time></time>',
			today_label: 'today',
			open_in_new_window_button: '새 창에서 열기',
			open_in_current_window_button: '현재 창에서 열기',
			private_windows_not_saved_label: 'Private window(s) not saved',
			private_windows_only_label: 'Private window(s) only',
			tabs_label: 'Tabs: ',
			windows_label: 'windows: ',
		},
		'it-IT': {
			language_name: 'Italian (Italiano)',
			language_btn: 'Lang',
			language_confirm: '✓ Change',
			language_cancel: '✕ Cancel',
			language_selection_tooltip: 'Select Session Panel interface language',
			title: 'Sessioni',
			new_session: 'Nuova sessione',
			session_name_placeholder: 'Nome sessione',
			all_windows: 'Tutte le finestre',
			only_selected: 'Solo schede selezionate',
			add_session_btn: 'Aggiungi sessione',
			add_session_btn_desc: 'Aggiungi sessione',
			refresh_sessions_btn: '⇄',
			refresh_sessions_btn_desc: 'Refresh session list and clear session name',
			saved_sessions: 'Saved Sessions',
			sort_title: 'Ordina per...',
			sort_date: 'Ordina per data',
			sort_name: 'Ordina per nome',
			sort_asc: 'Ordine crescente',
			sort_desc: 'Ordine decrescente',
			delete_button: 'Elimina questa sessione',
			delete_prompt: 'Sei sicuro di voler eliminare $T?',
			delete_number_sessions: 'Sei sicuro di voler eliminare $N sessioni selezionate?',
			delete_number_sessions_general: '',
			number_sessions_1_form: '',
			number_sessions_2_4_form: '',
			number_sessions_5_20_form: '',
			delete_confirm: '⚠ Sì, Elimina',
			action_cancel: 'No, non farlo',
			open_number_sessions: 'Are you sure you want to open $N selected sessions?',
			open_number_sessions_general: '',
			open_confirm: '⚠ Yes, open',
			overwrite_prompt: 'Are you sure you want to overwrite session $T?',
			overwrite_confirm: '⚠ Yes, overwrite',
			time_created_label: 'Creata <time></time>',
			today_label: 'today',
			open_in_new_window_button: 'Apri in una nuova finestra',
			open_in_current_window_button: 'Apri nella finestra corrente',
			private_windows_not_saved_label: 'Private window(s) not saved',
			private_windows_only_label: 'Private window(s) only',
			tabs_label: 'Tabs: ',
			windows_label: 'windows: ',
		},
		'de-DE': {
			language_name: 'German (Deutsch)',
			language_btn: 'Lang',
			language_confirm: '✓ Change',
			language_cancel: '✕ Cancel',
			language_selection_tooltip: 'Select Session Panel interface language',
			title: 'Sitzungen',
			new_session: 'Neue Sitzung',
			session_name_placeholder: 'Name der Sitzung',
			all_windows: 'Alle Fenster',
			only_selected: 'Nur ausgewählte Tabs',
			add_session_btn: 'Sitzung hinzufügen',
			add_session_btn_desc: 'Sitzung hinzufügen',
			refresh_sessions_btn: '⇄',
			refresh_sessions_btn_desc: 'Refresh session list and clear session name',
			saved_sessions: 'Saved Sessions',
			sort_title: 'Sortieren nach...',
			sort_date: 'Sortieren nach Datum',
			sort_name: 'Sortieren nach Namen',
			sort_asc: 'Aufsteigend sortieren',
			sort_desc: 'Absteigend sortieren',
			delete_button: 'Diese Sitzung löschen',
			delete_prompt: 'Wollen Sie $T wirklich löschen?',
			delete_number_sessions: 'Wollen Sie die $N ausgewählten Sitzungen wirklich löschen?',
			delete_number_sessions_general: '',
			number_sessions_1_form: '',
			number_sessions_2_4_form: '',
			number_sessions_5_20_form: '',
			delete_confirm: '⚠ Ja, löschen',
			action_cancel: 'Nein',
			open_number_sessions: 'Are you sure you want to open $N selected sessions?',
			open_number_sessions_general: '',
			open_confirm: '⚠ Yes, open',
			overwrite_prompt: 'Are you sure you want to overwrite session $T?',
			overwrite_confirm: '⚠ Yes, overwrite',
			time_created_label: 'Erstellt <time></time>',
			today_label: 'today',
			open_in_new_window_button: 'In neuem Fenster öffnen',
			open_in_current_window_button: 'Im aktuellen Fenster öffnen',
			private_windows_not_saved_label: 'Private window(s) not saved',
			private_windows_only_label: 'Private window(s) only',
			tabs_label: 'Tabs: ',
			windows_label: 'windows: ',
		},
		'nl-NL': {
			language_name: 'Dutch (Nederlands)',
			language_btn: 'Lang',
			language_confirm: '✓ Change',
			language_cancel: '✕ Cancel',
			language_selection_tooltip: 'Select Session Panel interface language',
			title: 'Sessies',
			new_session: 'Nieuwe sessie',
			session_name_placeholder: 'Sessienaam',
			all_windows: 'Alle vensters',
			only_selected: 'Alleen geselecteerde tabbladen',
			add_session_btn: 'Sessie toevoegen',
			add_session_btn_desc: 'Sessie toevoegen',
			refresh_sessions_btn: '⇄',
			refresh_sessions_btn_desc: 'Refresh session list and clear session name',
			saved_sessions: 'Saved Sessions',
			sort_title: 'Sorteren op...',
			sort_date: 'Sorteren op datum',
			sort_name: 'Sorteren op naam',
			sort_asc: 'Oplopend sorteren',
			sort_desc: 'Aflopend sorteren',
			delete_button: 'Sessie verwijderen',
			delete_prompt: 'Weet u zeker dat u $T wilt verwijderen?',
			delete_number_sessions: 'Weet u zeker dat u $N geselecteerde sessies wilt verwijderen?',
			delete_number_sessions_general: '',
			number_sessions_1_form: '',
			number_sessions_2_4_form: '',
			number_sessions_5_20_form: '',
			delete_confirm: '⚠ Ja, verwijderen',
			action_cancel: 'Nee, behouden',
			open_number_sessions: 'Are you sure you want to open $N selected sessions?',
			open_number_sessions_general: '',
			open_confirm: '⚠ Yes, open',
			overwrite_prompt: 'Are you sure you want to overwrite session $T?',
			overwrite_confirm: '⚠ Yes, overwrite',
			time_created_label: 'Toegevoegd om <time></time>',
			today_label: 'today',
			open_in_new_window_button: 'Openen in nieuw venster',
			open_in_current_window_button: 'Openen in huidig venster',
			private_windows_not_saved_label: 'Private window(s) not saved',
			private_windows_only_label: 'Private window(s) only',
			tabs_label: 'Tabs: ',
			windows_label: 'windows: ',
		},
		'ja-JP': {
			language_name: 'Japanese (日本語)',
			language_btn: 'Lang',
			language_confirm: '✓ Change',
			language_cancel: '✕ Cancel',
			language_selection_tooltip: 'Select Session Panel interface language',
			title: 'セッション',
			new_session: '新しいセッション',
			session_name_placeholder: 'セッション名',
			all_windows: '全てのウィンドウ',
			only_selected: '選択したタブのみ',
			add_session_btn: 'セッションを保存',
			add_session_btn_desc: 'セッションを保存',
			refresh_sessions_btn: '⇄',
			refresh_sessions_btn_desc: 'Refresh session list and clear session name',
			saved_sessions: 'Saved Sessions',
			sort_title: '並べ替え...',
			sort_date: '日付で並べ替え',
			sort_name: 'セッション名で並べ替え',
			sort_asc: '昇順に並べ替え',
			sort_desc: '降順に並べ替え',
			delete_button: 'セッションを削除',
			delete_prompt: '$T を削除しますか？',
			delete_number_sessions: '選択した$N個のセッションを削除しますか？',
			delete_number_sessions_general: '',
			number_sessions_1_form: '',
			number_sessions_2_4_form: '',
			number_sessions_5_20_form: '',
			delete_confirm: '⚠ 削除',
			action_cancel: 'キャンセル',
			open_number_sessions: 'Are you sure you want to open $N selected sessions?',
			open_number_sessions_general: '',
			open_confirm: '⚠ Yes, open',
			overwrite_prompt: 'Are you sure you want to overwrite session $T?',
			overwrite_confirm: '⚠ Yes, overwrite',
			time_created_label: '作成日 <time></time>',
			today_label: 'today',
			open_in_new_window_button: '新しいウィンドウで開く',
			open_in_current_window_button: '現在のウィンドウで開く',
			private_windows_not_saved_label: 'Private window(s) not saved',
			private_windows_only_label: 'Private window(s) only',
			tabs_label: 'Tabs: ',
			windows_label: 'windows: ',
		},
		'pt-BR': {
			language_name: 'Brazilian Portuguese (Português brasil)',
			language_btn: 'Lang',
			language_confirm: '✓ Change',
			language_cancel: '✕ Cancel',
			language_selection_tooltip: 'Select Session Panel interface language',
			title: 'Sessões',
			new_session: 'Nova sessão',
			session_name_placeholder: 'Nome da sessão',
			all_windows: 'Todas as janelas',
			only_selected: 'Apenas abas selecionadas',
			add_session_btn: 'Adicionar sessão',
			add_session_btn_desc: 'Adicionar sessão',
			refresh_sessions_btn: '⇄',
			refresh_sessions_btn_desc: 'Refresh session list and clear session name',
			saved_sessions: 'Saved Sessions',
			sort_title: 'Organizar por...',
			sort_date: 'Organizar por data',
			sort_name: 'Organizar por nome',
			sort_asc: 'Organizar por ordem crescente',
			sort_desc: 'Organizar por ordem decrescente',
			delete_button: 'Deletar essa sessão',
			delete_prompt: 'Você deseja deletar $T?',
			delete_number_sessions: 'Você deseja deletar $N sessões selecionadas?',
			delete_number_sessions_general: '',
			number_sessions_1_form: '',
			number_sessions_2_4_form: '',
			number_sessions_5_20_form: '',
			delete_confirm: '⚠ Sim, delete',
			action_cancel: 'Não, não deletar',
			open_number_sessions: 'Are you sure you want to open $N selected sessions?',
			open_number_sessions_general: '',
			open_confirm: '⚠ Yes, open',
			overwrite_prompt: 'Are you sure you want to overwrite session $T?',
			overwrite_confirm: '⚠ Yes, overwrite',
			time_created_label: 'Criado em <time></time>',
			today_label: 'today',
			open_in_new_window_button: 'Abrir em uma nova janela',
			open_in_current_window_button: 'Abrir na janela atual',
			private_windows_not_saved_label: 'Private window(s) not saved',
			private_windows_only_label: 'Private window(s) only',
			tabs_label: 'Tabs: ',
			windows_label: 'windows: ',
		},
		'pl-PL': {
			language_name: 'Polish (Polski)',
			language_btn: 'Lang',
			language_confirm: '✓ Change',
			language_cancel: '✕ Cancel',
			language_selection_tooltip: 'Select Session Panel interface language',
			title: 'Sesje',
			new_session: 'Nowa sesja',
			session_name_placeholder: 'Nazwa sesji',
			all_windows: 'Wszystkie okna',
			only_selected: 'Tylko zaznaczone karty',
			add_session_btn: 'Dodaj sesję',
			add_session_btn_desc: 'Dodaj sesję',
			refresh_sessions_btn: '⇄',
			refresh_sessions_btn_desc: 'Refresh session list and clear session name',
			saved_sessions: 'Saved Sessions',
			sort_title: 'Sortuj według...',
			sort_date: 'Sortuj według daty',
			sort_name: 'Sortuj według nazwy',
			sort_asc: 'Sortuj rosnąco',
			sort_desc: 'Sortuj malejąco',
			delete_button: 'Usuń tę sesję',
			delete_prompt: 'Czy jesteś pewien że chcesz usunąć $T?',
			delete_number_sessions: 'Czy jesteś pewien że chcesz usunąć $N zaznaczonych sesji?',
			delete_number_sessions_general: '',
			number_sessions_1_form: '',
			number_sessions_2_4_form: '',
			number_sessions_5_20_form: '',
			delete_confirm: '⚠ Tak, usuń',
			action_cancel: 'Nie, nie usuwaj',
			open_number_sessions: 'Are you sure you want to open $N selected sessions?',
			open_number_sessions_general: '',
			open_confirm: '⚠ Yes, open',
			overwrite_prompt: 'Are you sure you want to overwrite session $T?',
			overwrite_confirm: '⚠ Yes, overwrite',
			time_created_label: 'Utworzono <time></time>',
			today_label: 'today',
			open_in_new_window_button: 'Otwórz w nowym oknie',
			open_in_current_window_button: 'Otwórz w obecnym oknie',
			private_windows_not_saved_label: 'Private window(s) not saved',
			private_windows_only_label: 'Private window(s) only',
			tabs_label: 'Tabs: ',
			windows_label: 'windows: ',
		},
	};
	
	
	/*
	 * Key is the ID of your advanced panel. This must be UNIQUE (across the whole vivaldi UI). If in doubt, append your name to ensure it is unique
	 *	 You can use this ID as a #selector in the advancedPanels.css file
	 * title: String, self explanatory
	 * url: String, a UNIQUE (amongst web panels) vivaldi:// url that points to a non-existent page. You must add this as a web panel
	 * switch: String of HTML, this will be set as the html in the panel switch button. E.g. an SVG
	 * initialHTML: String of HTML, this will be used to fill in the panel with a skeleton of HTML to use
	 * module: () => {onInit, onActivate} All necessary javascript should be included here.
	 *	 onInit: () => void. This will be called AFTER the advanced panel DOM is added, but BEFORE onActivate is called.
	 *	 onActivate: () => void. This will be called each time the advanced panel is opened AND IMMEDIATELY AFTER onInit.
	 */
	const CUSTOM_PANELS = {
		sessions_lonm: {
			title: "Sessions",
			url: "vivaldi://sessions",
			switch: `<span>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="5 0 10 10">
						<path d="M7 2h6v1h-6v-1zm0 2h6v1h-6v-1zm0 2h6v1h-6v-1z"></path>
					</svg>
				</span>`,
			initialHTML: "", //Will set localized HTML later
			module: function(){
				/*
				 * Returns if rightest decimal digit is 1 or 2-4 or 5-20 (21 is treated as 1, 22-24 is treated as 2-4, 
				 * 25-30 as 5-20, 31 as 1, 32-34 as 2-4, 35-40 as 5-20, etc). Useful for Slavic languages only
				 * @returns string from 3 string parameters according to number parameter
				 */
				function getNumWithEnding(num, form_1, form_2_4, form_5_20){
					if(
						num % 100 >= 11
						&&
						num % 100 <= 19
					){
						return '' + num + ' ' + form_5_20;
					} else {
						switch (num % 10){
							case (1): return '' + num + ' ' + form_1;
							case (2):
							case (3):
							case (4): return '' + num + ' ' + form_2_4;
							default: return '' + num + ' ' + form_5_20;
						}
					}
				}
				
				/*
				 * Get selected session names
				 * @returns string array of names
				 */
				function getSelectedSessionNames(){
					SelectedSessions = Array.from(document.querySelectorAll("#sessions_lonm li.selected"));
					return SelectedSessions.map(x => x.getAttribute("data-session-name"));
				}
				
				/*
				 * Check if the target of a click is a button
				 * @param target an event target
				 */
				function isButton(target){
					const tag = target.tagName.toLowerCase();
					return (tag === "button" && target.className === "delete") || (tag === "svg" && target.parentElement.className === "delete") || (tag === "button" && target.className === "open-new") || (tag === "svg" && target.parentElement.className === "open-new") || (tag === "button" && target.className === "open-current") || (tag === "svg" && target.parentElement.className === "open-current");
				}
				
				/*
				 * Open a session after its corresponding list item is clicked
				 * @param e click event
				 * REMARK: Hide the confirm box if it is open
				 * REMARK: If click was on a button, just ignore it
				 */
				function listItemClick(e){
					if(isButton(e.target)){
						return;
					}
					
					let currentSession = e.currentTarget;
					let sessionName = currentSession.querySelector('div h3').innerText;
					let isPrivateSessionClicked = isPrivateSession(sessionName);
					
					if(e.altKey){
						const sessionList = document.querySelectorAll("#sessions_lonm li");
						
						sessionList.forEach(session => session.classList.add("selected"));
					} else if(e.shiftKey){
						let firstSession = null;
						let lastSession = null;
						const currentItem = e.currentTarget;
						
						const sessionList = document.querySelectorAll("#sessions_lonm li");
						sessionList.forEach(session => {
							if(firstSession === null && (session === currentItem || session.classList.contains("selected"))){
								firstSession = session;
							} else if(session === currentItem || session.classList.contains("selected")){
								lastSession = session;
							}
						});
						
						sessionList.forEach(session => {
							if(firstSession !== null && firstSession !== session){
								session.classList.toggle("selected", false);
							}
							else if(firstSession === session){
								session.classList.toggle("selected", true);
								firstSession = null;
							}
							else if(firstSession === null && lastSession !== null && lastSession !== session){
								session.classList.toggle("selected", true);
							}
							else if(firstSession === null && lastSession === session){
								session.classList.toggle("selected", true);
								lastSession = null;
							}
							else {
								session.classList.toggle("selected", false);
							}
						});
					} else if(e.ctrlKey){
						e.currentTarget.classList.toggle("selected");
					} else {
						const oldselect = document.querySelectorAll("#sessions_lonm li.selected");
						oldselect.forEach(session => session.classList.remove("selected"));
						e.currentTarget.classList.add("selected");
					}
					
					
					let firstSelectedSession = null;
					let previosClickedSession = null;
					LastClickedSession = e.currentTarget;
					
					const allSessions = document.querySelectorAll("#sessions_lonm li");
					allSessions.forEach(session => { //Remember first selected session to make it 'last selected' if 'last selected' is deselected
						if(firstSelectedSession === null && session.classList.contains("selected")){
							firstSelectedSession = session;
						}
						
						if(session.classList.contains("last-selected")){
							if(session.classList.contains("selected")){
								previosClickedSession = session;
							}
							
							session.classList.remove("last-selected");
						}
					});
					
					let lastSelectedSession = null;
					if(previosClickedSession !== null && LastClickedSession !== null && !LastClickedSession.classList.contains("selected")){
						previosClickedSession.classList.add("last-selected");
						lastSelectedSession = null;
					} else if(LastClickedSession.classList.contains("selected")){
						LastClickedSession.classList.add("last-selected");
						lastSelectedSession = LastClickedSession;
					} else {
						LastClickedSession = firstSelectedSession;
						if(LastClickedSession !== null){
							LastClickedSession.classList.add("last-selected");
						}
						lastSelectedSession = null;
					}
					
					if(lastSelectedSession === null){
						sessionName = "";
					} else if(!CurrentWindowIsPrivate && !isPrivateSessionClicked){
						sessionName = convertDisplayedSessionName(sessionName, true, 2);
					} else if(CurrentWindowIsPrivate && isPrivateSessionClicked){
						sessionName = convertDisplayedSessionName(sessionName, true, 2);
					} else {
						sessionName = "";
					}
					document.querySelector('#sessions_lonm .add-session-group input.session-name').value = sessionName;
				}
				
				/*
				 * Returns if displayed session is private
				 * @param {displayedSessionName} string
				 */
				function isPrivateSession(displayedSessionName){
					if(displayedSessionName.substring(displayedSessionName.length - PrivateWindowsOnlyDisplayedPostfix.length) === PrivateWindowsOnlyDisplayedPostfix){
						return true;
					} else {
						return false;
					}
				}
				
				/* Turns a string into a string that can be used in a file name, except for char ':'
				 * @param {filename} string
				 */
				function getSafeFilenameExceptTime(filename){
					const badChars = /[\\/\*\?"<>\|]/gi;
					return filename.replace(badChars, '.');
				}
				
				/*
				 * Turns a date into a string that can be used in a file name
				 * Locale string seems to be the best at getting the correct time for any given timezone
				 * @param {Date} date object
				 */
				function dateToFileSafeStringExceptTime(date){
					const badChars = /[\\/\*\?"<>\|]/gi;
					return getSafeFilenameExceptTime(date.toLocaleString());
				}
				
				/* Turns a string into a string that can be used in a file name
				 * @param {filename} string
				 */
				function getSafeFilename(filename){
					return getSafeFilenameExceptTime(filename).replace(/:/g, "`");
				}
				
				/*
				 * Converts displayed session name to user friendly string
				 * @param {displayedSessionName} string
				 * @param {removeTabWindowCount} bool: removes '[tab count@window count]'
				 * @param {removeDisplayedPostfix} number: 0 - don't remove, 1 - remove not saved private window(s) postfix, 2 - remove any postfix.
				 */
				function convertDisplayedSessionName(displayedSessionName, removeTabWindowCount, removeDisplayedPostfix){
					if(removeDisplayedPostfix > 0){
						if(displayedSessionName.substring(displayedSessionName.length - PrivateWindowsOnlyDisplayedPostfix.length) === PrivateWindowsOnlyDisplayedPostfix){
							if(removeDisplayedPostfix === 2){
								displayedSessionName = displayedSessionName.substring(0, displayedSessionName.length - PrivateWindowsOnlyDisplayedPostfix.length);
							}
						} else if(displayedSessionName.substring(displayedSessionName.length - PrivateWindowsNotSavedDisplayedPostfix.length) === PrivateWindowsNotSavedDisplayedPostfix){
							displayedSessionName = displayedSessionName.substring(0, displayedSessionName.length - PrivateWindowsNotSavedDisplayedPostfix.length);
						}
					}
					
					if(removeTabWindowCount){
						displayedSessionName = displayedSessionName.replace(/(.*)\s\[\d+@?\d*\](.*)$/, '$1$2');
					}
					
					return displayedSessionName;
				}
				
				function getTabWindowCountRepresentation(tabCount, windowCount){
					let representation;
					
					if(windowCount > 1){
						representation = " [" + tabCount + "@" + windowCount + "]";
					} else if(tabCount > 0){
						representation = " [" + tabCount + "]";
					} else {
						representation = "";
					}
					
					return representation;
				}
				
				/*
				 * Converts session name to user friendly string
				 * @param {sessionName} string
				 * @param {replaceTime} bool: replace '`' by ':'
				 * @param {removePostfix} number: 0 - don't remove, 1 - remove not saved private window(s) postfix, 2 - remove any postfix.
				 * @param {addDisplayedPostfix} bool
				 */
				function convertSessionName(sessionName, replaceTime, tabCount, windowCount, removePostfix, addDisplayedPostfix){
					if(removePostfix > 0){
						if(sessionName.substring(sessionName.length - PrivateWindowsOnlyFilenamePostfix.length) === PrivateWindowsOnlyFilenamePostfix){
							if(removePostfix === 2){
								sessionName = sessionName.substring(0, sessionName.length - PrivateWindowsOnlyFilenamePostfix.length);
								
								sessionName += getTabWindowCountRepresentation(tabCount, windowCount);
								
								if(addDisplayedPostfix){
									sessionName += PrivateWindowsOnlyDisplayedPostfix;
								}
							}
						} else if(sessionName.substring(sessionName.length - PrivateWindowsNotSavedFilenamePostfix.length) === PrivateWindowsNotSavedFilenamePostfix){
							sessionName = sessionName.substring(0, sessionName.length - PrivateWindowsNotSavedFilenamePostfix.length);
							
							sessionName += getTabWindowCountRepresentation(tabCount, windowCount);
							
							if(addDisplayedPostfix){
								sessionName += PrivateWindowsNotSavedDisplayedPostfix;
							}
						} else {
							sessionName += getTabWindowCountRepresentation(tabCount, windowCount);
						}
					}
					
					if(replaceTime){
						sessionName = sessionName.replace(/`/g, ':');
					}
					
					return sessionName;
				}
				
				/*
				 * Add a new session
				 * @param e button click event
				 */
				function addSessionClick(e){
					let name = document.querySelector('#sessions_lonm .add-session-group input.session-name').value;
					const saveAllWindows = document.querySelector('#sessions_lonm .add-session-group input.all-windows').checked;
					const saveSelectedTabs = document.querySelector('#sessions_lonm .add-session-group input.selected-tabs').checked;
					const markedTabs = document.querySelectorAll(".tab.marked");
					
					const nameDate = dateToFileSafeStringExceptTime(new Date());
					if(OldNameDate === nameDate){ //Disable too frequent session saves
						return;
					}
					OldNameDate = nameDate;
					
					if(name === ""){
						name = nameDate.substring(0, nameDate.length - 3); //Remove seconds from session name
					}
					SaveFilename = getSafeFilename(name);
						
					Options = {
						saveOnlyWindowId: saveAllWindows ? 0 : window.vivaldiWindowId
					};
					
					let selectedTabsCount = 0;
					if(saveSelectedTabs && markedTabs && markedTabs.length > 0){
						Options.ids = Array.from(markedTabs).map(tab => Number(tab.id.replace("tab-", "")));
						selectedTabsCount = markedTabs.length;
					}
					
					chrome.windows.getAll({
						populate: true,
						windowTypes: ["normal"]
					}, openedWindows => {
						let openedWindowsCount = openedWindows.length;
						let privateWindowsCount = 0;
						
						for(let i = 0; i < openedWindows.length; i++){
							if(openedWindows[i].incognito){
								privateWindowsCount++;
							}
						}
						
						if(selectedTabsCount === 0){
							if(CurrentWindowIsPrivate){
								SaveFilename += PrivateWindowsOnlyFilenamePostfix;
							} else {
								if(saveAllWindows && privateWindowsCount > 0){
									if(openedWindowsCount > privateWindowsCount){
										SaveFilename += PrivateWindowsNotSavedFilenamePostfix;
									} else {
										return;
									}
								}
							}
						}
						
						
						const savedSessionsLi = Array.from(document.getElementsByTagName('li'));
						const savedSessions = savedSessionsLi.map(x => x.getAttribute("data-session-name"));
						let savedSessionNameFound = false;
						
						for(let i = 0; i < savedSessions.length; i++){
							let friendlySavedSessionName;
							if(CurrentWindowIsPrivate){
								savedSessionNameFound = (convertSessionName(savedSessions[i], false, 0, 0, 0, false) === convertSessionName(SaveFilename, false, 0, 0, 0, false));
								friendlySavedSessionName = convertSessionName(savedSessions[i], true, 0, 0, 2, true);
							} else {
								savedSessionNameFound = (convertSessionName(savedSessions[i], false, 0, 0, 1, false) === convertSessionName(SaveFilename, false, 1, false));
								friendlySavedSessionName = convertSessionName(savedSessions[i], true, 0, 0, 2, true);
							}
							
							if(savedSessionNameFound){
								SelectedSessions = new Array();
								SelectedSessions.push(savedSessions[i]);
								
								const overwrite_t = l10nLocalized.overwrite_prompt.replace('$T', friendlySavedSessionName);
								confirmMessage(overwrite_t, "overwrite");
								break;
							}
						}
						
						
						if(!savedSessionNameFound){
							vivaldi.sessionsPrivate.saveOpenTabs(SaveFilename, Options, () => {
								updateList();
							});
						}
					});
				}
				
				/*
				 * Refresh session list
				 * @param e button click event
				 */
				function refreshSessionsClick(e){
					updateList();
				}
				
				/*
				 * Change sort Order
				 * @param e click event
				 */
				function sortOrderChange(e){
					document.querySelectorAll("#sessions_lonm .sortselector-button").forEach(el => {
						el.classList.toggle("selected");
					});
					updateList();
				}
				
				/*
				 * Change sort Method
				 * @param e click event
				 */
				function sortMethodChange(e){
					updateList();
				}
				
				/*
				 * Show the delete confirmation box with specified text
				 * @param msg string to use
				 */
				function confirmMessage(question, dialogClass){
					document.querySelector("#confirm-" + dialogClass + " p").innerText = question;
					document.querySelector("#modal-container-" + dialogClass).classList.add("show");
				}
				
				/*
				 * User cancelled language change/remove/open/overwrite
				 * @param e event
				 */
				function actionCancelClick(e){
					let select = document.getElementById("LONM_SESSIONS_PANEL_LANGUAGE_SELECT");
					select.value = LANGUAGE;
					
					document.querySelector("#modal-container-language").classList.remove("show");
					document.querySelector("#modal-container-overwrite").classList.remove("show");
					document.querySelector("#modal-container-del").classList.remove("show");
					document.querySelector("#modal-container-open-new").classList.remove("show");
					document.querySelector("#modal-container-open-current").classList.remove("show");
				}
				
				/*
				 * User clicked language change button
				 * @param e click event
				 */
				function languageClick(e){
					const language = l10nLocalized.language_selection_tooltip;
					confirmMessage(language, "language");
				}
				
				/*
				 * User confirmed language change
				 * @param e event
				 */
				function languageConfirmClick(e){
					document.querySelector("#modal-container-language").classList.remove("show");
					
					let oldLanguageValue = LANGUAGE;
					LANGUAGE = document.querySelector("#LONM_SESSIONS_PANEL_LANGUAGE_SELECT").value;
						
					chrome.storage.local.set({ ["LONM_SESSIONS_PANEL_LANGUAGE"]: LANGUAGE }, () => {
						if(oldLanguageValue !== LANGUAGE){
							const currentlyOpen = document.querySelectorAll(".webpanel-stack .panel");
							currentlyOpen.forEach(convertWebPanelToAdvancedPanel);
						}
					});
				}
				
				/*
				 * User confirmed overwrite
				 * @param e event
				 * REMARK: Want to overwrite current and only update UI after final write
				 */
				function overwriteConfirmClick(e){
					document.querySelector("#modal-container-overwrite").classList.remove("show");
					vivaldi.sessionsPrivate.delete(SelectedSessions[0], ( ) => {
						vivaldi.sessionsPrivate.saveOpenTabs(SaveFilename, Options, () => {});
						updateList();
					});
				}
				
				/*
				 * User clicked remove button
				 * @param e click event
				 */
				function deleteClick(e){
					SelectedSessions = getSelectedSessionNames();
					
					if(SelectedSessions.length === 1){
						const sessionName = convertSessionName(SelectedSessions[0], true, 0, 0, 1, true);
						const delete_t = l10nLocalized.delete_prompt.replace('$T', sessionName);
						confirmMessage(delete_t, "del");
					} else {
						let delete_n = '';
						
						if(l10nLocalized.delete_number_sessions_general === ''){
							delete_n = l10nLocalized.delete_number_sessions.replace('$N', SelectedSessions.length);
						} else {
							const sessionsText = getNumWithEnding(SelectedSessions.length, l10nLocalized.number_sessions_1_form, l10nLocalized.number_sessions_2_4_form, l10nLocalized.number_sessions_5_20_form);
								
							delete_n = l10nLocalized.delete_number_sessions_general.replace('$N', sessionsText);
						}
						
						confirmMessage(delete_n, "del");
					}
				}
				
				/*
				 * User confirmed remove
				 * @param e event
				 * REMARK: Want to remove all and only update UI after final removal
				 */
				function deleteConfirmClick(e){
					document.querySelector("#modal-container-del").classList.remove("show");
					
					for(let i = 0; i < SelectedSessions.length - 1; i++){
						vivaldi.sessionsPrivate.delete(SelectedSessions[i],() => {});
					}
					vivaldi.sessionsPrivate.delete(SelectedSessions[SelectedSessions.length - 1], () => {
						updateList();
					});
				}
				
				function openSessions(newWindow){
					SelectedSessions.forEach(session => {
						vivaldi.sessionsPrivate.open(
							window.vivaldiWindowId,
							session,
							{openInNewWindow: newWindow}
						);
					});
				}
				
				/*
				 * User clicked open (new) button
				 * @param e click event
				 */
				function openInNewWindowClick(e){
					SelectedSessions = getSelectedSessionNames();
					
					if(SelectedSessions.length === 1){
						openSessions(true);
					} else {
						let open_n = '';
						
						if(l10nLocalized.open_number_sessions_general === ''){
							open_n = l10nLocalized.open_number_sessions.replace('$N', SelectedSessions.length);
						} else {
							const sessionsText = getNumWithEnding(SelectedSessions.length, l10nLocalized.number_sessions_1_form, l10nLocalized.number_sessions_2_4_form, l10nLocalized.number_sessions_5_20_form);
							
							open_n = l10nLocalized.open_number_sessions_general.replace('$N', sessionsText);
						}
						
						confirmMessage(open_n, "open-new");
					}
				}
				
				function openInNewWindowConfirmClick(e){
					document.querySelector("#modal-container-open-new").classList.remove("show");
					openSessions(true);
				}
				
				/*
				 * User clicked open (current) button
				 * @param e click event
				 */
				function openInCurrentWindowClick(e){
					SelectedSessions = getSelectedSessionNames();
					
					if(SelectedSessions.length === 1){
						openSessions(false);
					} else {
						let open_n = '';
						
						if(l10nLocalized.open_number_sessions_general === ''){
							open_n = l10nLocalized.open_number_sessions.replace('$N', SelectedSessions.length);
						} else {
							const sessionsText = getNumWithEnding(SelectedSessions.length, l10nLocalized.number_sessions_1_form, l10nLocalized.number_sessions_2_4_form, l10nLocalized.number_sessions_5_20_form);
								
							open_n = l10nLocalized.open_number_sessions_general.replace('$N', sessionsText);
						}
						
						confirmMessage(open_n, "open-current");
					}
				}
				
				function openInCurrentWindowConfirmClick(e){
					document.querySelector("#modal-container-open-current").classList.remove("show");
					openSessions(false);
				}
				
				/*
				 * Turn a date into a string to show underneath each session
				 * @param {Date} date
				 */
				function dateToString(date){
					return date.toLocaleString();
				}
				
				/*
				 * Generate a list item for a session object
				 * @returns DOM list item
				 */
				function createListItem(session){
					const template = document.querySelector("#sessions_lonm template.session-item");
					const el = document.importNode(template.content, true);
					
					let timedSessionName = convertSessionName(session.name, true, session.tabs, session.windows, 2, true);
					
					let friendlySessionName = convertSessionName(session.name, true, 0, 0, 2, false);
					friendlySessionName += ' [' + l10nLocalized.tabs_label + session.tabs;
					if(session.windows > 0){
						friendlySessionName += ', ' + l10nLocalized.windows_label + session.windows;
					}
					
					if(session.name.substring(session.name.length - PrivateWindowsOnlyFilenamePostfix.length) === PrivateWindowsOnlyFilenamePostfix){
						friendlySessionName = friendlySessionName + ', ' + l10nLocalized.private_windows_only_label.toLowerCase();
					} else if(session.name.substring(session.name.length - PrivateWindowsNotSavedFilenamePostfix.length) === PrivateWindowsNotSavedFilenamePostfix){
						friendlySessionName = friendlySessionName + ', ' + l10nLocalized.private_windows_not_saved_label.toLowerCase();
					}
					
					friendlySessionName += ']';
					
					const date = new Date(session.createDateJS);
					const sessionDate = (new Date(session.createDateJS)).setHours(0,0,0,0);
					const currentDate = (new Date()).setHours(0,0,0,0);
					let dateIfToday = dateToString(date);
					let sessionTime = '';
					if(sessionDate === currentDate){
						sessionTime = dateIfToday.replace(/^.*,\s(\d\d:\d\d:\d\d)/, '$1');
						dateIfToday = l10nLocalized.today_label + ', ' + sessionTime;
					}

					el.querySelector("h3").innerText = timedSessionName;
					el.querySelector("h3").setAttribute("title", friendlySessionName);
					el.querySelector("time").innerText = dateIfToday;
					el.querySelector("time").setAttribute("title", friendlySessionName);
					el.querySelector("time").setAttribute("datetime", date.toISOString());
					el.querySelector("li").addEventListener("click", listItemClick);
					el.querySelector(".open-new").addEventListener("click", openInNewWindowClick);
					el.querySelector(".open-current").addEventListener("click", openInCurrentWindowClick);
					el.querySelector(".delete").addEventListener("click", deleteClick);
					el.querySelector("li").setAttribute("data-session-name", session.name);
					
					return el;
				}
				
				/*
				 * Sort the array of sessions
				 * @param sessions array of session objects - unsorted
				 * @returns sessions array of session objects - sorted
				 */
				function sortSessions(sessions){
					const sortRule = document.querySelector("#sessions_lonm .sortselector-dropdown").value;
					const sortDescending = document.querySelector("#sessions_lonm .direction-descending.selected");
					
					if(sortRule === "visitTime" && sortDescending){
						sessions.sort((a,b) => {return a.createDateJS - b.createDateJS;});
					} else if (sortRule === "visitTime" && !sortDescending){
						sessions.sort((a,b) => {return b.createDateJS - a.createDateJS;});
					} else if (sortRule === "title" && sortDescending){
						sessions.sort((a,b) => {return a.name.localeCompare(b.name);});
					} else if (sortRule === "title" && !sortDescending){
						sessions.sort((a,b) => {return b.name.localeCompare(a.name);});
					}
					
					return sessions;
				}
				
				/*
				 * Create the dom list for the sessions
				 * @param sessions The array of session objects (already sorted)
				 * @returns DOM list of session items
				 */
				function createList(sessions){
					const newList = document.createElement("ul");
					sessions.forEach((session, index) => {
						const li = createListItem(session, index);
						newList.appendChild(li);
					});
					
					return newList;
				}
				
				/*
				 * Get the array of sessions and recreate the list in the panel
				 */
				function updateList(){
					document.querySelector('#sessions_lonm .add-session-group input.session-name').value = "";
					document.querySelector('#sessions_lonm .add-session-group input.all-windows').checked = false;
					document.querySelector('#sessions_lonm .add-session-group input.selected-tabs').checked = false;
					
					LastClickedSession = null;
					const existingList = document.querySelector("#sessions_lonm .sessions-list ul");
					
					vivaldi.sessionsPrivate.getAll(items => {
						const sorted = sortSessions(items);
						const newList = createList(sorted);
						document.querySelector("#sessions_lonm .sessions-list").replaceChild(newList, existingList);
					});
				}
				
				/*
				 * Update the session listing on activation of panel
				 */
				function onActivate(){
					updateList();
				}
				
				/*
				 * Add the sort listeners on creation of panel
				 */
				function onInit(){
					document.querySelectorAll("#sessions_lonm .sortselector-button").forEach(el => {
						el.removeEventListener("click", sortOrderChange);
						el.addEventListener("click", sortOrderChange);
					});
					
					//Remove event listeners if they are already assigned to replace them
					document.querySelector("#sessions_lonm .sortselector-dropdown").removeEventListener("change", sortMethodChange);
					document.querySelector("#sessions_lonm .add-session-group .add-session-buttons .add-session").removeEventListener("click", addSessionClick);
					document.querySelector("#sessions_lonm .add-session-group .add-session-buttons .refresh-sessions").removeEventListener("click", refreshSessionsClick);
					document.querySelector("#sessions_lonm .add-session-group .language-button").removeEventListener("click", languageClick);
					document.querySelector("#yes-language").removeEventListener("click", languageConfirmClick);
					document.querySelector("#no-language").removeEventListener("click", actionCancelClick);
					document.querySelector("#yes-overwrite").removeEventListener("click", overwriteConfirmClick);
					document.querySelector("#no-overwrite").removeEventListener("click", actionCancelClick);
					document.querySelector("#yes-del").removeEventListener("click", deleteConfirmClick);
					document.querySelector("#no-del").removeEventListener("click", actionCancelClick);
					document.querySelector("#yes-open-new").removeEventListener("click", openInNewWindowConfirmClick);
					document.querySelector("#no-open-new").removeEventListener("click", actionCancelClick);
					document.querySelector("#yes-open-current").removeEventListener("click", openInCurrentWindowConfirmClick);
					document.querySelector("#no-open-current").removeEventListener("click", actionCancelClick);
					
					//Add event listeners
					document.querySelector("#sessions_lonm .sortselector-dropdown").addEventListener("change", sortMethodChange);
					document.querySelector("#sessions_lonm .add-session-group .add-session-buttons .add-session").addEventListener("click", addSessionClick);
					document.querySelector("#sessions_lonm .add-session-group .add-session-buttons .refresh-sessions").addEventListener("click", refreshSessionsClick);
					document.querySelector("#sessions_lonm .add-session-group .language-button").addEventListener("click", languageClick);
					document.querySelector("#yes-language").addEventListener("click", languageConfirmClick);
					document.querySelector("#no-language").addEventListener("click", actionCancelClick);
					document.querySelector("#yes-overwrite").addEventListener("click", overwriteConfirmClick);
					document.querySelector("#no-overwrite").addEventListener("click", actionCancelClick);
					document.querySelector("#yes-del").addEventListener("click", deleteConfirmClick);
					document.querySelector("#no-del").addEventListener("click", actionCancelClick);
					document.querySelector("#yes-open-new").addEventListener("click", openInNewWindowConfirmClick);
					document.querySelector("#no-open-new").addEventListener("click", actionCancelClick);
					document.querySelector("#yes-open-current").addEventListener("click", openInCurrentWindowConfirmClick);
					document.querySelector("#no-open-current").addEventListener("click", actionCancelClick);
				}
				
				return {
					onInit: onInit,
					onActivate: onActivate
				};
			}
		}
	};
	
	
	/*
	 * Observe for changes to the UI, e.g. if panels are hidden by going in to fullscreen mode
	 * This may require the panel buttons and panels to be re-converted
	 * Also, observe panels container, if class changes to switcher, the webstack is removed
	 */
	const UI_STATE_OBSERVER = new MutationObserver(records => {
		convertWebPanelButtonstoAdvancedPanelButtons();
		listenForNewPanelsAndConvertIfNecessary();
	});
	
	/*
	 * Observe UI state changes
	 */
	function observeUIState(){
		const classInit = {
			attributes: true,
			attributeFilter: ["class"]
		};
		UI_STATE_OBSERVER.observe(document.querySelector("#browser"), classInit);
		UI_STATE_OBSERVER.observe(document.querySelector("#panels-container"), classInit);
	}
	
	const PANEL_STACK_CREATION_OBSERVER = new MutationObserver((records, observer) => {
		observer.disconnect();
		listenForNewPanelsAndConvertIfNecessary();
	});
	
	
	/*
	 * Start listening for new web panel stack children and convert any already open ones
	 */
	function listenForNewPanelsAndConvertIfNecessary(){
		const panelStack = document.querySelector("#panels .webpanel-stack");
		if(panelStack){
			WEBPANEL_CREATE_OBSERVER.observe(panelStack, {childList: true});
			const currentlyOpen = document.querySelectorAll(".webpanel-stack .panel");
			currentlyOpen.forEach(convertWebPanelToAdvancedPanel);
		} else {
			const panels = document.querySelector("#panels");
			PANEL_STACK_CREATION_OBSERVER.observe(panels, {childList: true});
		}
	}
	
	/*
	 * Observer that should check for child additions to web panel stack
	 * When a new child is added (a web panel initialised), convert it appropriately
	 */
	const WEBPANEL_CREATE_OBSERVER = new MutationObserver(records => {
		records.forEach(record => {
			record.addedNodes.forEach(convertWebPanelToAdvancedPanel);
		});
	});
	
	/*
	 * Webview loaded a page. This means the src has been initially set.
	 * @param e load event
	 */
	function webviewLoaded(e){
		e.currentTarget.removeEventListener("contentload", webviewLoaded);
		convertWebPanelToAdvancedPanel(e.currentTarget.parentElement.parentElement);
	}
	
	/*
	 * Attempt to convert a web panel to an advanced panel.
	 * First check if the SRC matches a registered value.
	 * If so, call the advanced Panel Created method
	 * @param node DOM node representing the newly added web panel (child of .webpanel-stack)
	 * REMARK: Webview.src can add a trailing "/" to URLs
	 * REMARK: When initially created the webview may have no src,
	 *	 so we need to listen for the first src change
	 */
	function convertWebPanelToAdvancedPanel(node){
		const addedWebview = node.querySelector("webview");
		if(!addedWebview){
			return;
		}
		if(!addedWebview.src){
			addedWebview.addEventListener("contentload", webviewLoaded);
			return;
		}
		for(const key in CUSTOM_PANELS){
			const panel = CUSTOM_PANELS[key];
			const expectedURL = panel.url;
			if(addedWebview.src.startsWith(expectedURL)){
				advancedPanelCreated(node, panel, key);
				break;
			}
		}
	}
	
	/*
	 * Convert a web panel into an Advanced Panel™
	 * @param node the dom node added under web panel stack
	 * @param panel the panel object descriptor
	 * @param panelId the identifier (key) for the panel
	 * REMARK: Vivaldi can instantiate some new windows with an
	 *	"empty" web panel containing nothing but the webview
	 * REMARK: Can't simply call node.innerHTML as otherwise the
	 *	vivaldi UI will crash when attempting to hide the panel
	 * REMARK: Check that the panel isn't already an advanced panel
	 *	before convert as this could be called after state change
	 * REMARK: it may take a while for vivaldi to update the title of
	 *	a panel, therefore after it is terminated, the title may
	 *	change to aborted. Title changing should be briefly delayed
	 */
	function advancedPanelCreated(node, panel, panelID){
		let isAdvancedPanel = node.getAttribute("advancedPanel");
		if(isAdvancedPanel && panelID !== "sessions_lonm"){
			return;
		}
		
		
		l10nLocalized = l10n[LANGUAGE];
		sessions_lonmTitle = l10nLocalized.title;
		sessions_lonmInitialHTML = '\
		<div class="add-session-group">\
			<span class="add-session-label"><span class="new-session">'+l10nLocalized.new_session+'</span>\
				<button class="language-button" title="'+l10nLocalized.language_selection_tooltip+'"  tabindex="-1">\
					<svg  width="20" height="20" viewBox="0 0 7 7" xmlns="http://www.w3.org/2000/svg">\
						<path d="M3.35 0c-0.022,-0.001 -0.111,0 -0.116,0 -1.767,0.035 -3.196,1.472 -3.218,3.242 -0.01,0.018 -0.015,0.038 -0.015,0.059 0,0.022 0.006,0.043 0.017,0.061 0.042,1.753 1.463,3.169 3.217,3.203 0.013,0 0.026,0.002 0.038,0.002 0.003,0 0.007,-0 0.01,-0 0.006,0 0.011,0 0.017,0 1.811,0 3.285,-1.473 3.285,-3.285 0,-1.794 -1.446,-3.256 -3.234,-3.283zm2.978 3.175l-1.202 0c-0.022,-1.233 -0.409,-2.274 -0.982,-2.803 1.229,0.357 2.137,1.472 2.184,2.803zm-3.155 -2.917l0 2.917 -1.502 0c0.029,-1.559 0.683,-2.822 1.502,-2.917zm0 3.17l0 2.881c-0.812,-0.094 -1.463,-1.338 -1.501,-2.881l1.501 0zm0.253 2.873l0 -2.873 1.447 0c-0.038,1.508 -0.66,2.731 -1.447,2.873zm0 -3.126l0 -2.909c0.793,0.143 1.419,1.385 1.448,2.909l-1.448 0zm-1.052 -2.779c-0.558,0.536 -0.934,1.565 -0.956,2.779l-1.148 0c0.046,-1.302 0.916,-2.397 2.104,-2.779zm-2.103 3.031l1.148 0c0.028,1.198 0.402,2.212 0.955,2.742 -1.177,-0.378 -2.042,-1.456 -2.103,-2.742zm3.873 2.767c0.567,-0.524 0.953,-1.549 0.981,-2.767l1.202 0c-0.062,1.315 -0.966,2.413 -2.183,2.767z"></path>\
					</svg>\
				</button>\
			</span>\
			<input type="text" placeholder="'+l10nLocalized.session_name_placeholder+'" class="session-name">\
			<span class="add-session-checkboxes-group">\
				<input type="checkbox" class="all-windows"><span class="add-session-checkboxes-labels">'+l10nLocalized.all_windows+'&nbsp;&nbsp;&nbsp;</span>\
				<input type="checkbox" class="selected-tabs"><span class="add-session-checkboxes-labels">'+l10nLocalized.only_selected+'</span>\
			</span>\
			<span class="add-session-buttons">\
				<input type="button" class="add-session" value="'+l10nLocalized.add_session_btn+'" title="'+l10nLocalized.add_session_btn_desc+'"></input>\
				<input type="button" class="refresh-sessions" value="'+l10nLocalized.refresh_sessions_btn+'" title="'+l10nLocalized.refresh_sessions_btn_desc+'"></input>\
			</span>\
		</div>\
		<div class="saved-sessions">\
			<h2>'+l10nLocalized.saved_sessions+'</h2>\
		</div>\
		<div class="sortselector sortselector-compact">\
			<select class="sortselector-dropdown" title="'+l10nLocalized.sort_title+'" tabindex="-1">\
				<option value="visitTime">'+l10nLocalized.sort_date+'</option>\
				<option value="title">'+l10nLocalized.sort_name+'</option>\
			</select>\
			<button class="sortselector-button direction-descending" title="'+l10nLocalized.sort_asc+'" tabindex="-1">\
				<svg width="11" height="6" viewBox="0 0 11 6" xmlns="http://www.w3.org/2000/svg">\
					<path d="M5.5.133l.11-.11 4.456 4.456-1.498 1.497L5.5 2.91 2.432 5.976.934 4.48 5.39.022l.11.11z"></path>\
				</svg>\
			</button>\
			<button class="sortselector-button direction-ascending selected" title="'+l10nLocalized.sort_desc+'" tabindex="-1">\
				<svg width="11" height="6" viewBox="0 0 11 6" xmlns="http://www.w3.org/2000/svg">\
					<path d="M5.5.133l.11-.11 4.456 4.456-1.498 1.497L5.5 2.91 2.432 5.976.934 4.48 5.39.022l.11.11z"></path>\
				</svg>\
			</button>\
		</div>\
			<section class="sessions-list">\
				<ul>\
				</ul>\
			</section>\
		<div class="remarks">\
			<span>'+PrivateWindowsNotSavedDisplayedPostfix+'</span><span>'+l10nLocalized.private_windows_not_saved_label+'</span>\
			<span>'+PrivateWindowsOnlyDisplayedPostfix+'</span><span>'+l10nLocalized.private_windows_only_label+'</span>\
		</div>\
		<div class="modal-container" id="modal-container-language">\
			<div class="confirm" id="confirm-language">\
				<p>'+l10nLocalized.language_selection_tooltip+'</p>\
				<div align="center" class="language-container">\
					<select class="language-select" id="LONM_SESSIONS_PANEL_LANGUAGE_SELECT"></select>\
				</div>\
				<button id="yes-language">'+l10nLocalized.language_confirm+'</button>\
				<button id="no-language">'+l10nLocalized.language_cancel+'</button>\
			</div>\
		</div>\
		<div class="modal-container" id="modal-container-overwrite">\
			<div class="confirm" id="confirm-overwrite">\
				<p>'+l10nLocalized.overwrite_prompt+'</p>\
				<button id="yes-overwrite">'+l10nLocalized.overwrite_confirm+'</button>\
				<button id="no-overwrite">'+l10nLocalized.action_cancel+'</button>\
			</div>\
		</div>\
		<div class="modal-container" id="modal-container-del">\
			<div class="confirm" id="confirm-del">\
				<p>'+l10nLocalized.delete_prompt+'</p>\
				<button id="yes-del">'+l10nLocalized.delete_confirm+'</button>\
				<button id="no-del">'+l10nLocalized.action_cancel+'</button>\
			</div>\
		</div>\
		<div class="modal-container" id="modal-container-open-new">\
			<div class="confirm" id="confirm-open-new">\
				<p>'+l10nLocalized.open_number_sessions+'</p>\
				<button id="yes-open-new">'+l10nLocalized.open_confirm+'</button>\
				<button id="no-open-new">'+l10nLocalized.action_cancel+'</button>\
			</div>\
		</div>\
		<div class="modal-container" id="modal-container-open-current">\
			<div class="confirm" id="confirm-open-current">\
				<p>'+l10nLocalized.open_number_sessions+'</p>\
				<button id="yes-open-current">'+l10nLocalized.open_confirm+'</button>\
				<button id="no-open-current">'+l10nLocalized.action_cancel+'</button>\
			</div>\
		</div>\
		<template class="session-item">\
			<li>\
				<div>\
					<h3></h3>\
					<span>'+l10nLocalized.time_created_label+'</span>\
				</div>\
				<button class="open-new" title="'+l10nLocalized.open_in_new_window_button+'">\
					<svg viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">\
						<path d="M21 6h-16v14h16v-14zm-11 2h2v2h-2v-2zm-3 0h2v2h-2v-2zm12 10h-12v-7h12v7zm0-8h-6v-2h6v2z"></path>\
					</svg>\
				</button>\
				<button class="open-current" title="'+l10nLocalized.open_in_current_window_button+'">\
					<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">\
						<path d="M0 9h16v2h-16v-2zm0-4h8v4h-8v-4z"></path>\
					<path opacity=".5" d="M9 5h7v3h-7z"></path>\
					</svg>\
				</button>\
				<button class="delete" title="'+l10nLocalized.delete_button+'">\
					<svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">\
						<path d="M10.2.5l-.7-.7L5 4.3.5-.2l-.7.7L4.3 5-.2 9.5l.7.7L5 5.7l4.5 4.5.7-.7L5.7 5"></path>\
					</svg>\
				</button>\
			</li>\
		</template>';
		
		
		const newHTML = document.createElement("div");
		if(panelID === "sessions_lonm"){
			newHTML.innerHTML = sessions_lonmInitialHTML;
		} else {
			newHTML.innerHTML = panel.initialHTML;
		}
		
		if(isAdvancedPanel){
			node.replaceChild(newHTML, node.lastChild);
			node.id = panelID;
		} else {
			node.querySelector("webview").terminate();
			
			node.appendChild(newHTML);
			node.id = panelID;
			node.setAttribute("advancedPanel", "true");
		}
		panel.module().onInit();
		
		if(panelID === "sessions_lonm"){
			fillLanguageList();
		}
		
		
		ADVANCED_PANEL_ACTIVATION.observe(node, {attributes: true, attributeFilter: ["class"]});
		if(node.querySelector("header.webpanel-header")){
			advancedPanelOpened(node);
			setTimeout(() => {updateAdvancedPanelTitle(node);}, 500);
		}
	}
	
	
	/*
	 * Observe attributes of an advanced panel to see when it becomes active
	 */
	const ADVANCED_PANEL_ACTIVATION = new MutationObserver(records => {
		records.forEach(record => {
			if(record.target.classList.contains("visible")){
				advancedPanelOpened(record.target);
			}
		});
	});
	
	/*
	 * An advanced panel has been selected by the user and is now active
	 * @param node DOM node of the advancedpanel activated
	 */
	function advancedPanelOpened(node){
		updateAdvancedPanelTitle(node);
		const panel = CUSTOM_PANELS[node.id];
		panel.module().onActivate();
	}
	
	/*
	 * Update the header title of a panel
	 * @param node DOM node of the advancedpanel activated
	 */
	function updateAdvancedPanelTitle(node){
		const panel = CUSTOM_PANELS[node.id];

		if(node.id === "sessions_lonm"){
			node.querySelector("header.webpanel-header h1").innerHTML = sessions_lonmTitle;
			node.querySelector("header.webpanel-header h1").title = sessions_lonmTitle;
		} else {
			node.querySelector("header.webpanel-header h1").innerHTML = panel.title;
			node.querySelector("header.webpanel-header h1").title = panel.title;
		}
	}
	
	
	
	/*
	 * Go through each advanced panel descriptor and convert the associated button
	 */
	function convertWebPanelButtonstoAdvancedPanelButtons(){
		for(const key in CUSTOM_PANELS){
			const panel = CUSTOM_PANELS[key];
			let switchBtn = document.querySelector(`#switch button[title~="${panel.url}"`);
			if(!switchBtn){
				switchBtn = document.querySelector(`#switch button[advancedPanelSwitch="${key}"`);
				if(!switchBtn){
					console.warn(`Failed to find button for ${panel.title}`);
					continue;
				}
			}
			convertSingleButton(switchBtn, panel, key);
		}
	}
	
	/*
	 * Set the appropriate values to convert a regular web panel switch into an advanced one
	 * @param switchBtn DOM node for the #switch button being converted
	 * @param panel The Advanced panel object description
	 * @param id string id of the panel
	 * REMARK: Check that the button isn't already an advanced panel button
	 *	before convert as this could be called after state change
	 */
	function convertSingleButton(switchBtn, panel, id){
		if(switchBtn.getAttribute("advancedPanelSwitch")){
			return;
		}
		switchBtn.title = panel.title;
		switchBtn.innerHTML = panel.switch;
		switchBtn.setAttribute("advancedPanelSwitch", id);
	}
	
	
	/*
	 * Observe web panel switches.
	 * REMARK: When one is added or removed, all of the web panels are recreated
	 */
	const WEB_SWITCH_OBSERVER = new MutationObserver(records => {
		convertWebPanelButtonstoAdvancedPanelButtons();
		listenForNewPanelsAndConvertIfNecessary();
	});
	
	/*
	 * Start observing for additions or removals of web panel switches
	 */
	function observePanelSwitchChildren(){
		const panelSwitch = document.querySelector("#switch");
		WEB_SWITCH_OBSERVER.observe(panelSwitch, {childList: true});
	}
	
	/* 
	 * Fill LONM_SESSIONS_PANEL_LANGUAGE_SELECT 'select' tag by the list of supported languages
	 */
	function fillLanguageList(){
		let select = document.getElementById("LONM_SESSIONS_PANEL_LANGUAGE_SELECT");
		select.innerHTML = "";
		for (let [lang_id, lang_dict] of Object.entries(l10n)){
			let option = document.createElement("option");
			option.value = lang_id;
			option.text = lang_dict.language_name;
			select.appendChild(option);
		};
		
		select.value = LANGUAGE;
	}
	
	/*
	 * Initialise the mod. Checking to make sure that the relevant panel element exists first.
	 */
	function initMod() {
		if(window.vivaldiWindowId){
			chrome.windows.getCurrent(windowItem => {
				CurrentWindowIsPrivate = windowItem.incognito;
				
				if(document.querySelector("#panels .webpanel-stack")){
					chrome.storage.local.get(["LONM_SESSIONS_PANEL_LANGUAGE"], setting => {
						LANGUAGE = setting["LONM_SESSIONS_PANEL_LANGUAGE"];
						if(LANGUAGE == null){
							LANGUAGE = "en-GB";
						}
						
						observeUIState();
						observePanelSwitchChildren();
						convertWebPanelButtonstoAdvancedPanelButtons();
						listenForNewPanelsAndConvertIfNecessary();
					});
				} else {
					setTimeout(initMod, 500);
				}
			});
		} else {
			setTimeout(initMod, 500);
		}
	}
	
	initMod();
})();
