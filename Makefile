all: true

true: 
	./rezip.sh web
	wsk -i action update /guest/test web.zip --kind  nodejs:10web --web true
	# wsk -i action update /guest/sharelatex/web web.zip --kind  nodejs:10web --web true

raw: 
	./rezip.sh web
	wsk -i action update /guest/test web.zip --kind  nodejs:10web --web raw
	
