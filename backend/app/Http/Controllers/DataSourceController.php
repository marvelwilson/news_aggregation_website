<?php

namespace App\Http\Controllers;

use DB;
use Illuminate\Http\Request;

class DataSourceController extends Controller
{
    //Receive Data function
    public function ReceiveData(Request $request) {
       
        $decoded = json_decode($request->allDatas);
        for ($i=0; $i < count($decoded); $i++) { 
            $check = DB::table('localdata')->where('news_id', $decoded[$i]->news_id)->get();
            if (count($check)<1) {
               DB::table('localdata')->insert([
                'from' => $decoded[$i]->from,
                'news_id'=> $decoded[$i]->news_id,
                'source'=> $decoded[$i]->source,
                'categories'=> $decoded[$i]->categories,
                'author'=> $decoded[$i]->author,
                'publish_date'=> $decoded[$i]->publish_date,
                'content'=> $decoded[$i]->content,
                'titleContent'=> $decoded[$i]->titleContent,
                'image'=> $decoded[$i]->image,
               ]);
            }
        }


        return response('successfully inserted data');
    }

    public function preference(Request $request) {
    
        User::where('id', $request->user_id)->update([
            'prefered_authors' => $request->authors,
            'prefered_categories' => $request->categories,
            'prefered_sources' => $request->sources
        ]);
        
        return response([
             'message'=> 'Updated Successfully'
        ], 200);
    }
    
    public function user(Request $request) {

        $auths = json_decode($request->user()->prefered_authors);
        $cats = json_decode($request->user()->prefered_categories);
        $srcs = json_decode($request->user()->prefered_sources);


          $filteredArr = [];
           $srcsArr =[];
            if ($srcs) {
                for ($i=0; $i <count($srcs) ; $i++) { 
                     array_push($srcsArr, $srcs[$i]->value);
                }
                
            }
            $authsArr =[];
            if ($auths) {
                  for ($i=0; $i <count($auths) ; $i++) { 
                    array_push($authsArr, $auths[$i]->value);
                  }
            }
            $catsArr = [];
            if ($cats) {
                for ($i=0; $i <count($cats) ; $i++) { 
                        array_push($catsArr, $cats[$i]->value);
                }
            }
          
        
        if ($auths && $cats && $srcs ) {
            $data = DB::table('localdata')
            ->whereIn('categories', $catsArr)
            ->whereIn('author', $authsArr)
            ->whereIn('source',$srcsArr) 
            ->latest('localdata.publish_date')->get();
        }else{
            $data = DB::table('localdata')
            ->latest('localdata.publish_date')->get();
        }
       
        $reference = DB::table('localdata')
            ->latest('localdata.publish_date')->get();
        $user = $request->user();
        return response(compact('user', 'data', 'reference'));

    }
}
