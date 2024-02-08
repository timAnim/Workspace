" Vundle
" ---------------------------------------------------------------------------
set nocompatible              " be iMproved, required
filetype off                  " required
set nomodeline

" set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
" alternatively, pass a path where Vundle should install plugins
"call vundle#begin('~/some/path/here')
set fdm=syntax

" let Vundle manage Vundle, required
Plugin 'gmarik/Vundle.vim'
" Plugin 'SirVer/ultisnips'

Plugin 'kien/ctrlp.vim'
Plugin 'Shougo/neocomplete'
Plugin 'nsf/gocode', {'rtp': 'vim/'}
Plugin 'fatih/vim-go'
Plugin 'adamclerk/vim-razor'
Plugin 'pangloss/vim-javascript'
Plugin 'myint/indent-finder'
Plugin 'majutsushi/tagbar'
Plugin 'ervandew/supertab'
Plugin 'vim-ruby/vim-ruby'
Plugin 'tpope/vim-rails'
Plugin 'ponzellus/AnsiEsc'
Plugin 'scrooloose/syntastic'
Plugin 'scrooloose/nerdtree'
"Plugin 'airblade/vim-gitgutter'
Plugin 'bling/vim-airline'
Plugin 'nanotech/jellybeans.vim'
Plugin 'Yggdroot/indentLine'
Plugin 'KurtPreston/vim-autoformat-rails'
Plugin 'jistr/vim-nerdtree-tabs'
Plugin 'godlygeek/tabular'
Plugin 'konfekt/fastfold'
Plugin 'christoomey/vim-tmux-navigator'
Plugin 'posva/vim-vue'
Plugin 'maksimr/vim-jsbeautify'
"Plugin 'plasticboy/vim-markdown'
"Plugin 'suan/vim-instant-markdown'

" All of your Plugins must be added before the following line
"
"
call vundle#end()            " required
filetype plugin indent on    " required

" self settings
" ---------------------------------------------------------------------------
syntax on
set nowrap
set nu ai
set ts=4 sw=4
set completeopt-=preview
set bg=dark
set clipboard=unnamed
set splitbelow
set splitright
syntax on
colorscheme jellybeans
"colorscheme default
set encoding=utf-8 fileencodings=ucs-bom,utf-8,cp936
let g:indentLine_color_term = 236

"Automatically remove trailing spaces when saving a file.
autocmd BufRead,BufWrite * if ! &bin | silent! %s/\s\+$//ge | endif

let g:neocomplete#enable_at_startup = 1
" let g:airline#extensions#tabline#enabled = 1

au FileType ruby let g:SuperTabDefaultCompletionType = "<c-x><c-o>"

au BufNewFile,BufRead,BufWrite *.py
\ set tabstop=4 |
\ set softtabstop=4 |
\ set shiftwidth=4 |
\ set expandtab |
\ set autoindent |
\ set fileformat=unix

"au BufNewFile,BufRead *.js, *.html, *.css set tabstop=2 softtabstop=2 shiftwidth=2
"\ set tabstop=2 |
"\ set softtabstop=2 |
"\ set shiftwidth=2

au BufWrite *.rb :silent! call AutoFormatRails()<CR>

au BufRead,BufNewFile *.thrift set filetype=thrift
au! Syntax thrift source ~/.vim/thrift.vim

" vim-go settings
" ---------------------------------------------------------------------------
let g:go_disable_autoinstall = 1
let g:go_fmt_command = "goimports"
let g:go_auto_type_info = 1

" tagbar
let g:tagbar_left = 1
nmap <F8> :TagbarToggle<CR>
let g:tagbar_type_go = {
    \ 'ctagstype' : 'go',
    \ 'kinds'     : [
        \ 'p:package',
        \ 'i:imports:1',
        \ 'c:constants',
        \ 'v:variables',
        \ 't:types',
        \ 'n:interfaces',
        \ 'w:fields',
        \ 'e:embedded',
        \ 'm:methods',
        \ 'r:constructor',
        \ 'f:functions'
    \ ],
    \ 'sro' : '.',
    \ 'kind2scope' : {
        \ 't' : 'ctype',
        \ 'n' : 'ntype'
    \ },
    \ 'scope2kind' : {
        \ 'ctype' : 't',
        \ 'ntype' : 'n'
    \ },
    \ 'ctagsbin'  : 'gotags',
    \ 'ctagsargs' : '-sort -silent'
	\ }

" syntastic
" ---------------------------------------------------------------------------
set statusline+=%#warningmsg#
set statusline+=%{SyntasticStatuslineFlag()}
set statusline+=%*

let g:syntastic_always_populate_loc_list = 1
let g:syntastic_auto_loc_list = 1
let g:syntastic_check_on_open = 1
let g:syntastic_check_on_wq = 0
let g:syntastic_ruby_checkers = ['mri']
let g:syntastic_go_checkers = ['golint', 'govet', 'errorcheck']
"let g:syntastic_aggregate_errors = 1


au FileType go let g:syntastic_auto_loc_list = 0

" key mapping
" ---------------------------------------------------------------------------
au FileType go nmap gd <Plug>(go-def)
au FileType go nmap <leader>r <Plug>(go-run)
au FileType go nmap <leader>b <Plug>(go-build)
au FileType go nmap <leader>t <Plug>(go-test)

nmap <C-h> :CtrlPBuffer<CR>
nmap <C-y> :NERDTreeToggle<CR>
map! <C-e> <END>
if exists('$TMUX')
   set term=screen-256color
endif
map <F5> :call CompileRunGcc()<CR>
func! CompileRunGcc()
    exec "w"
    if &filetype == 'c'
        exec "!g++ % -o %<"
        exec "!time ./%<"
    elseif &filetype == 'cpp'
        exec "!g++ % -o %<"
        exec "!time ./%<"
    elseif &filetype == 'java'
        exec "!javac %"
        exec "!time java %<"
    elseif &filetype == 'sh'
        :!time bash %
    elseif &filetype == 'python'
        exec "!time python2.7 %"
    elseif &filetype == 'html'
        exec "!firefox % &"
    elseif &filetype == 'go'
		"exec "!go build %<"
        exec "!time go run %"
    elseif &filetype == 'mkd'
        exec "!~/.vim/markdown.pl % > %.html &"
        exec "!firefox %.html &"
    endif
endfunc

" enable backspace
set backspace=indent,eol,start
set hlsearch
" auto gv
vmap > >gv
vmap < <gv

" fold
set foldmethod=indent
map <F4> <ESC>:%!python -m json.tool

"NerdTree####################################################
"去除第一行的帮助提示
let NERDTreeMinimalUI=1
"在左边占多宽
let NERDTreeWinSize=28
"不高亮显示光标所在的文件
let NERDTreeHighlightCursorline=0
"当前目录的设定
let NERDTreeChDirMode = 2
"自动退出
autocmd bufenter * if (winnr("$") == 1 && exists("b:NERDTreeType") &&b:NERDTreeType == "primary") | q | endif
"打开vim时自动打开
autocmd vimenter * NERDTree
"<F2>作为toggle
nmap <F2> :NERDTreeToggle<CR>

"Tagbar######################################################
"在这儿设定二者的分布
let g:tagbar_vertical = 25
"去除第一行的帮助信息
let g:tagbar_compact = 1
"当编辑代码时，在Tagbar自动追踪变量
let g:tagbar_autoshowtag = 1
"个人爱好，展开关闭文件夹的图标
let g:tagbar_iconchars = ['▸', '▾']
"<F3>作为toggle
nmap <F3> :TagbarToggle<CR>
"打开vim时自动打开
autocmd VimEnter * nested :TagbarOpen
wincmd l
"如果不加这句，打开vim的时候当前光标会在Nerdtree区域
autocmd VimEnter * wincmd l

".vimrc
map <c-f> :call JsBeautify()<cr>
" or
autocmd FileType javascript noremap <buffer>  <c-f> :call JsBeautify()<cr>
" for json
autocmd FileType json noremap <buffer> <c-f> :call JsonBeautify()<cr>
" for jsx
autocmd FileType jsx noremap <buffer> <c-f> :call JsxBeautify()<cr>
" for html
autocmd FileType html noremap <buffer> <c-f> :call HtmlBeautify()<cr>
" for css or scss
autocmd FileType css noremap <buffer> <c-f> :call CSSBeautify()<cr>

