<?php

namespace App\Http\Controllers;

use App\Models\NewConduite;
use Illuminate\Console\View\Components\Alert;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NewConduiteController extends Controller
{
    /**
         * Display a listing of the resource.
         */
        public function index()
        {


        }

        public function seeNewConduite(string $id)
        {

          $newConduite=NewConduite::find($id)
                  ->get();

            return response()->json($newConduite);

        }

        public function show(string $id)
         {

            try {
                $newConduites = DB::table('new_conduites')
                    ->join('conduites', 'conduites.id', '=', 'new_conduites.conduite_id')
                    ->select('new_conduites.id','new_conduites.conduite_id','new_conduites.noteCond',
                    'new_conduites.avisFormCond','new_conduites.created_at','conduites.supprimer','conduites.archiver')
                    ->where('new_conduites.conduite_id',$id)
                    ->where('conduites.supprimer',0)
                    ->where('conduites.archiver',0)
                    ->get();
                    \Log::info('New Conduites:', $newConduites->toArray());
                return response()->json($newConduites->toArray());
            } catch (\Throwable $e) {
                \Log::error($e);
                return response()->json(['error' => $e->getMessage()], 500);
            }

         }

        /**
         * Show the form for creating a new resource.
         */
        public function create()
        {

        }

        /**
         * Store a newly created resource in storage.
         */
        public function store(Request $request, string $id)
        {
            try {
                NewConduite::create([
                    'noteCond'=> $request->input('noteCond'),
                    'avisFormCond'=> $request->input('avisFormCond'),
                    'conduite_id'=> $id,
                ]);
                return response()->json([
                    'message'=>'true'
                ]);
            } catch (\Throwable $e) {
                return response()->json([
                    'message'=>$e
                ]);
            }
        }


        /**
         * Show the form for editing the specified resource.
         */
        public function edit(string $id)
        {
            //
        }

        /**
         * Update the specified resource in storage.
         */
        public function update(Request $request, string $id)
        {
            try {
                $newConduite=NewConduite::find($id);

                $newConduite->update([
                    'noteCond'=> $request->input('noteCond'),
                    'avisFormCond'=> $request->input('avisFormCond'),
                ]);

                return response()->json([
                    'message'=>$id
                ]);

            } catch (\Throwable $e) {
                return response()->json([
                    'message'=>$e
                ]);
            }


        }

        /**
         * Remove the specified resource from storage.
         */
        public function destroy(string $id)
        {
            //
        }
}
