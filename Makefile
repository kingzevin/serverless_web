all: raw

true: 
	./rezip.sh web
	wsk -i action update /guest/test web.zip --kind  nodejs:10web --web true
	# wsk -i action update /guest/sharelatex/web web.zip --kind  nodejs:10web --web true

raw: 
	./rezip.sh web
	# wsk -i action update /guest/sharealtex/web web.zip --kind  nodejs:10web --web raw
	wsk -i action update /guest/sharelatex/web web.zip --docker kingzevin/nodejs10web:20.6.22 --web raw
	
